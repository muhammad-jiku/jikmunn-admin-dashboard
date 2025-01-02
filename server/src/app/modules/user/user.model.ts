import { model, Schema } from 'mongoose';
import { userRoles } from './user.constants';
import { IUser, IUserModel } from './user.interfaces';

// schema pattern for statics methods
const userSchema = new Schema<IUser, IUserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    occupation: {
      type: String,
      required: false,
    },
    transactions: {
      type: [String], // Array of strings
      required: false,
    },
    role: {
      type: String,
      required: true,
      enum: userRoles, // Use the array as an enum // Restrict to specific values
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const User: IUserModel = model<IUser, IUserModel>('User', userSchema);
