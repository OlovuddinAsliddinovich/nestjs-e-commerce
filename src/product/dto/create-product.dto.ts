import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsNumberString,
} from 'class-validator';

export class CreateProductDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  price: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  owner: string;
}
