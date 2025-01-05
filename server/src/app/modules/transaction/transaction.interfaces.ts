import { Model, Types } from 'mongoose';

export interface ITransaction {
  userId: string;
  cost: string;
  products: {
    type: Types.ObjectId;
    of: number;
  }[];
}

// types of product model for statics methods
export type ITransactionModel = Model<ITransaction, Record<string, unknown>>;

export interface ITransactionFilters {
  searchTerm?: string;
  userId?: string;
  cost?: string;
}
