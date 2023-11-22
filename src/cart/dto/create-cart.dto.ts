import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';

export class CartProductDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  @Min(1)
  quantity: number;
}

export class CreateCartDto {
  @IsNumber()
  readonly userId: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly updatedAt: Date;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CartProductDto)
  readonly cartProducts: CartProductDto[];
}
