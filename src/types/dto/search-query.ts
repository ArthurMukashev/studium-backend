import { IsOptional, IsString } from 'class-validator';

export class SearchQueryDto {
  @IsString()
  @IsOptional()
  search_field: string | undefined;

  @IsString()
  @IsOptional()
  search_value: string | undefined;
}
