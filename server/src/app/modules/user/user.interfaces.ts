import { Model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  city: string;
  state: string | null; // Allow null for the state
  country: string;
  occupation: string;
  phoneNumber: string;
  transactions: string[]; // Array of transaction IDs
  role: 'user' | 'admin' | 'superadmin'; // Restrict role to specific values
}

// types of user model for statics methods
export type IUserModel = Model<IUser, Record<string, unknown>>;
