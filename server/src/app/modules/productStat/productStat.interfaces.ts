import { Model } from 'mongoose';

export interface IProductStat {
  productId: string;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  year: number;
  monthlyData: [
    {
      month: string;
      totalSales: number;
      totalUnits: number;
    },
  ];
  dailyData: [
    {
      date: string;
      totalSales: number;
      totalUnits: number;
    },
  ];
}

// types of product model for statics methods
export type IProductStatModel = Model<IProductStat, Record<string, unknown>>;
