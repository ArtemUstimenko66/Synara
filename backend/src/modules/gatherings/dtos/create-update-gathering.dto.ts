import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUpdateGatheringDto {
  @ApiProperty({
    example: 'Збір на авто для 36 бригади',
    description: 'Name of the gathering',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Допоможіть купити авто',
    description: 'Description of the gathering',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'Нам потрібен автомоіль з гарним мотором',
    description: 'Detail of the gathering',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  detail: string;

  @ApiProperty({
    example: 'Військовим',
    description: 'Who need help in the gathering',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  whoNeedHelp: string;

  @ApiProperty({
    example: 'На допомогу військовим',
    description: 'Where money of the gathering will used',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  whereMoneyWillUsed: string;

  @ApiProperty({
    example: '60000',
    description: 'Amount money of the gathering, that needed',
    type: String,
  })
  @IsNumber()
  @IsNotEmpty()
  goal: number;

  @ApiProperty({
    example: '60000',
    description: 'Amount money of the gathering, that collected',
    type: String,
  })
  @IsNumber()
  @IsNotEmpty()
  collected: number;

  @ApiProperty({
    example: '2024-09-25',
    description: 'Start of the gathering',
    type: Date,
  })
  @IsDate({ message: 'Invalid date format' })
  startGathering: Date;

  @ApiProperty({
    example: '2024-09-30',
    description: 'End of the gathering',
    type: Date,
  })
  @IsDate({ message: 'Invalid date format' })
  endGathering: Date;

  @ApiProperty({
    example: '4627100101654724',
    description: 'Number of the card, where will collected money',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  numberOfCard: string;
}