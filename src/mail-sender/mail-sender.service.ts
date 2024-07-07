import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class MailSenderService {
  constructor(private readonly configService: ConfigService) {}
  protected readonly logger = new Logger(MailSenderService.name);
  async sendMail({
    to,
    subject,
    html,
  }: {
    to: string;
    subject: string;
    html: string;
  }) {
    sgMail.setApiKey(this.configService.get('SG_API_KEY'));
    const msg = {
      to,
      from: `"CoffeeDoor" <${this.configService.get('SG_EMAIL_ADDRESS')}>`,
      subject,
      html,
    };

    try {
      const response = await sgMail.send(msg);
      this.logger.log(`Email sent to ${to}`);
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
