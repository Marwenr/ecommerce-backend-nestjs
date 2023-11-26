import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';
import { Payment, Status } from '../entities/order.entity';

export class OrderProductDto {
  @IsNumber()
  readonly productId: number;

  @IsNumber()
  @Min(1)
  readonly quantity: number;
}

export class CreateOrderDto {
  @IsNumber()
  readonly userId: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly updatedAt: Date;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  readonly orderProduct: OrderProductDto[];

  @IsEnum(Status)
  readonly status: Status = Status.Pending;

  @IsEnum(Payment)
  readonly payment: Payment = Payment.Cash;

  @IsNumber()
  readonly total: number;
}
