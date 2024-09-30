import { Inject, Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';

@Injectable()
export class S3Service {
  constructor(@Inject('S3_CLIENT') private readonly s3Client: S3Client) {}

  async uploadFile(file: Express.Multer.File, bucket: string): Promise<string> {
    const key = `${uuid()}-${file.originalname}`;
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });
    await this.s3Client.send(command);

    return `https://${bucket}.s3.amazonaws.com/${key}`;
  }
}
