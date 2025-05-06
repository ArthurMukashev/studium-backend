import { Response } from 'express';
import { Injectable } from '@nestjs/common';
import { MyLogger } from '@/common';
import { RegisterDto } from './dto';

@Injectable()
export class AuthService {
	constructor(private logger: MyLogger) {
		this.logger.setContext(AuthService.name);
	}

	register({ dto, res }: { dto: RegisterDto; res: Response }) {
		this.logger.verbose(`Регистрация нового пользователя: ${dto.email}`);
	}
}
