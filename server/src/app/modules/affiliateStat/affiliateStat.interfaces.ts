import { Model, Types } from 'mongoose';

export interface IAffiliateStat {
  userId: Types.ObjectId;
  affiliateSales: Types.ObjectId;
}

// types of product model for statics methods
export type IAffiliateStatModel = Model<
  IAffiliateStat,
  Record<string, unknown>
>;
