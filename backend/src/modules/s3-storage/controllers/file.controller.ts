import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { S3Service } from '../services/s3.service';
import { FileService } from '../services/file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('files')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly s3Service: S3Service,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('userId') userId: number,
  ) {
    const bucket = 'synarabucket';
    const fileUrl = await this.s3Service.uploadFile(file, bucket);
    const fileRecord = await this.fileService.createFile(
      file.originalname,
      fileUrl,
      file.mimetype,
      userId,
    );
    return { file: fileRecord };
  }
}
