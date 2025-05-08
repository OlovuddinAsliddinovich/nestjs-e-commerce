import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

class Product {
  @ApiProperty({
    type: String,
    description: 'Id of purchased product!',
  })
  @IsString()
  @IsNotEmpty()
  product: string;

  @ApiProperty({
    type: Number,
    description: 'Quantity of product!',
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class OrderDTO {
  @ApiProperty({
    type: String,
    description: 'Owner Id',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  owner: string;

  @ApiProperty({
    type: String,
    description: 'Total price of purchased products',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  totalPrice: string;

  @ApiProperty({
    type: Product,
    description: 'Purchased product',
  })
  @ValidateNested()
  @Type(() => Product)
  product: Product;
}
