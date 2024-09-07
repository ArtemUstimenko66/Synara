import { S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

export const S3Config = {
  provide: 'S3_CLIENT',
  useFactory: (configService: ConfigService) => {
    return new S3Client({
      region: configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: configService.get('AWS_S3_ACCESS_KEY'),
        secretAccessKey: configService.get('AWS_S3_ACCESS_SECRET_KEY'),
      },
    });
  },
  inject: [ConfigService],
};
