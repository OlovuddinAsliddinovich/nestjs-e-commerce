import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { orderSchema } from 'src/models/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: orderSchema }]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
