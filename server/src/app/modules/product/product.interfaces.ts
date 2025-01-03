import { Model } from 'mongoose';

export interface IProduct {
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  supply: number;
}

// types of product model for statics methods
export type IProductModel = Model<IProduct, Record<string, unknown>>;
