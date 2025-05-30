import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { BadRequestException, Injectable } from '@nestjs/common';
import { RoleType } from '@prisma/client';
import { JwtAuthService, MyLogger, PayloadType } from '@/common';
import { BCRYPT_HASH_ROUNDS } from '@/constants';
import { setCookie } from '@/lib';
import type { LoginDto, RegisterDto } from './dto';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtAuthService: JwtAuthService,
    private readonly repository: AuthRepository,
    private logger: MyLogger,
  ) {
    this.logger.setContext(AuthService.name);
  }

  async register({ email, password }: RegisterDto, res: Response) {
    this.logger.verbose(`Регистрация нового пользователя: ${email}`);

    const userExists = await this.repository.findUserByEmail(email);
    if (userExists) {
      throw new BadRequestException('Пользователь с таким email существует');
    }

    const role = await this.repository.findRoleByName(RoleType.USER);

    if (!role) {
      throw new BadRequestException('Роль USER не найдена');
    }

    const hashPassword = await bcrypt.hash(password, BCRYPT_HASH_ROUNDS);

    const account = await this.repository.createUser({ dto: { email, password: hashPassword }, role_id: role.id });

    const { access_token, refresh_token } = await this.jwtAuthService.generateUserTokens<PayloadType>({
      id: account.id,
      role: account.role.name,
      is_superadmin: false,
    });

    setCookie.accessToken(res, access_token);
    setCookie.refreshToken(res, refresh_token);
    return account;
  }

  async login({ email, password }: LoginDto, res: Response) {
    const user = await this.repository.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException('Пользователь с таким email не найден');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Неверный пароль');
    }

    const { access_token, refresh_token } = await this.jwtAuthService.generateUserTokens<PayloadType>({
      id: user.id,
      role: user.role.name,
      is_superadmin: user.is_superadmin,
    });

    setCookie.accessToken(res, access_token);
    setCookie.refreshToken(res, refresh_token);

    return user;
  }
}
