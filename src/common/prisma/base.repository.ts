import { Inject } from '@nestjs/common';
import { PrismaService } from '@/common';
import { PrismaTransactionClient, SortOrderType } from '@/types';

export abstract class BaseRepository {
  constructor(@Inject(PrismaService) protected readonly prisma: PrismaService) {}

  protected withTransaction(tx?: PrismaTransactionClient) {
    return tx ?? this.prisma;
  }

  protected withWhere<TWhereInput>({
    search_field,
    search_value,
  }: {
    search_field?: string;
    search_value?: string;
  }): TWhereInput | undefined {
    if (!search_field || !search_value) {
      return undefined;
    }

    const searchPath: string[] = search_field.split('.');

    const buildNestedObject = (path: string[]): unknown => {
      if (path.length === 1) {
        const [current] = path;
        return { [current]: { contains: search_value } };
      }
      const [current, ...rest] = path;
      return { [current]: buildNestedObject(rest) };
    };

    return buildNestedObject(searchPath) as TWhereInput;
  }

  protected withOrderBy<TOrderByWithRelationInput>({
    field,
    sortOrder = SortOrderType.ASC,
  }: {
    field?: string;
    sortOrder: SortOrderType;
  }): TOrderByWithRelationInput | undefined {
    const sortPath = (field ?? 'created_at').split('.');

    const buildNestedObject = (path: string[]): unknown => {
      if (path.length === 0) return sortOrder;
      const [current, ...rest] = path;
      return { [current]: buildNestedObject(rest) };
    };

    return buildNestedObject(sortPath) as TOrderByWithRelationInput;
  }

  protected withOrderByArr<TOrderByWithRelationInput>({
    fields,
    sortOrder,
  }: {
    fields?: string[];
    sortOrder: SortOrderType;
  }): TOrderByWithRelationInput[] | unknown[] {
    return (fields ?? ['created_at']).map((field) => {
      const sortPath = field.split('.');
      const buildNestedObject = (path: string[]): unknown => {
        if (path.length === 0) return sortOrder;
        const [current, ...rest] = path;
        return { [current]: buildNestedObject(rest) };
      };
      return buildNestedObject(sortPath);
    });
  }

  protected withPagination({ take, skip }: { take?: number; skip?: number }) {
    return {
      take: take ?? 10,
      skip: skip ?? 0,
    };
  }
}
