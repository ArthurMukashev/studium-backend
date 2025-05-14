import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MyLogger } from '@/common';

@Injectable()
export class MailService {
  private readonly transporter;

  constructor(
    private readonly configService: ConfigService,
    private logger: MyLogger,
  ) {
    // Проверка наличия конфигурации SMTP перед созданием экземпляра MailService
    this.validateSmtpConfiguration();

    this.logger.setContext(MailService.name);

    // Создание транспортера для отправки почты
    this.transporter = nodemailer.createTransport({
      host: configService.get<string>('SMTP_HOST'),
      port: configService.get<number>('SMTP_PORT'),
      secure: false,
      auth: {
        user: configService.get<string>('SMTP_USER'),
        pass: configService.get<string>('SMTP_PASSWORD'),
      },
    });
  }

  /**
   * Отправляет код по электронной почте.
   * @param to Адрес электронной почты, на который отправляется код.
   * @param subject Тема письма.
   * @param html HTML содержимое письма.
   */
  async sendEmail(to: string, subject: string, html: string) {
    await this.transporter.sendMail({ from: this.configService.get('SMTP_USER'), to, subject, html });
  }

  /**
   * Отправляет пароль по электронной почте.
   * @param to Адрес электронной почты, на который отправляется пароль.
   * @param value Пароль.
   */
  async sendCode(to: string, value: number | string) {
    const subject = `Код подтверждения Профтестиум`;
    const html = `
      <div>
        <h1>Новый пароль</h1>
        <span>Скопируйте его и вставьте на странице входа</span>
        <h2>${value}</h2>
      </div>
    `;
    await this.sendEmail(to, subject, html);
  }

  /**
   * Отправляет код для сброса пароля по электронной почте.
   * @param to Адрес электронной почты, на который отправляется код.
   * @param code Код для сброса пароля.
   */
  async sendResetCode(to: string, code: string) {
    const subject = `Восстановление пароля ${this.configService.get('BASE_URL')}`;
    const html = `
      <div>
        <h1>Забыли пароль?</h1>
        <p>Если нет, то проигнорируйте данное письмо</p>
        <p>Если да, то введите код для восстановления пароля</p>
        <p>Код действителен 1 час</p>
        <h2>${code}</h2>
      </div>
    `;
    await this.sendEmail(to, subject, html);
  }

  /**
   * Проверяет наличие конфигурации SMTP перед созданием экземпляра MailService.
   * Если какой-либо параметр конфигурации отсутствует, выбрасывает ошибку.
   */
  private validateSmtpConfiguration() {
    const requiredParams = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASSWORD'];

    for (const param of requiredParams) {
      if (!this.configService.get(param)) {
        throw new Error(`Отсутствует конфигурация SMTP: ${param}`);
      }
    }
  }
}
