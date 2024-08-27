import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmIpnDto {
  @IsNotEmpty()
  @IsString()
  ipn: string;

  @IsNotEmpty()
  date: string;
}
