import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    region: {
      type: String,
    },
    district: {
      type: String,
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next: any) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    const hashedPassword = await bcrypt.hash(this['password'] as string, 10);
    this['password'] = hashedPassword;

    next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
});
