import { Model } from 'mongoose';
import { ITransaction } from '../transaction/transaction.interfaces';

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

export interface IDashboardStats {
  totalCustomers: number;
  yearlyTotalSoldUnits: number;
  yearlySalesTotal: number;
  monthlyData: Array<{
    month: string;
    totalSales: number;
    totalUnits: number;
  }>;
  salesByCategory: Record<string, number>;
  thisMonthStats?: {
    month: string;
    totalSales: number;
    totalUnits: number;
  };
  todayStats?: {
    date: string;
    totalSales: number;
    totalUnits: number;
  };
  transactions: ITransaction[];
}

export interface IGeography {
  id: string; // ISO3 code of the country
  value: number; // Number of users from this country
}

export interface IUserPerformance {
  user: IUser; // The user object with all its properties
  sales: ITransaction[]; // Array of transaction objects associated with the user's affiliate sales
}
