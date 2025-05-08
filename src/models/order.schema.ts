import * as mongoose from 'mongoose';

export const orderSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  totalPrice: String,
  products: [
    {
      product: { type: mongoose.Types.ObjectId, ref: 'Product' },
    },
  ],
  quantity: Number,
});
