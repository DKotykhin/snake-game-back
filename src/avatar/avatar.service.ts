import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import * as sharp from 'sharp';

@Injectable()
export class AvatarService {
  constructor(private readonly configService: ConfigService) {}

  s3 = new S3Client({
    credentials: {
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    },
    region: this.configService.get('AWS_REGION'),
  });

  async getImageUrl(fileName: string) {
    const params = {
      Bucket: this.configService.get('AWS_BUCKET_NAME'),
      Key: `avatar/${fileName}`,
    };
    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(this.s3, command, { expiresIn: 3600 });

    return url;
  }

  async createAvatar(id: string, avatar: Express.Multer.File): Promise<string> {
    try {
      const fileName = id + '-' + avatar.fieldname + '.webp';
      const avatarPath = `avatar/${fileName}`;

      const fileBuffer = await sharp(avatar.buffer)
        .webp()
        .resize(200)
        .toBuffer();

      const params = {
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Key: avatarPath,
        Body: fileBuffer,
        ContentType: 'image/webp',
      };
      const command = new PutObjectCommand(params);

      await this.s3.send(command);

      return fileName;
    } catch (err) {
      throw new HttpException(
        "Can't upload avatar",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteAvatar(avatar: string): Promise<boolean> {
    const params = {
      Bucket: this.configService.get('AWS_BUCKET_NAME'),
      Key: `avatar/${avatar}`,
    };
    const command = new DeleteObjectCommand(params);
    try {
      await this.s3.send(command);
    } catch (error) {
      throw new HttpException(
        "Can't delete avatar",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return true;
  }
}
