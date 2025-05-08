import { Document } from 'mongoose';
import { User } from './user.interface';
import { Product } from './product.interface';

interface ProductOrder {
  product: Product;
  quantity: number;
}

export interface Order extends Document {
  owner: User;
  totalPrice: string;
  products: ProductOrder[];
}
