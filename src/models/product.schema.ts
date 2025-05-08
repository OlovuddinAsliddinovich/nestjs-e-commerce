import * as mongoose from 'mongoose';

export const productSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: String,
    image: String,
    amount: Number,
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);
