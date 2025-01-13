import { Model } from 'mongoose';

export interface IMonthlyData {
  month: string;
  totalSales: number;
  totalUnits: number;
}

export interface IDailyData {
  date: string;
  totalSales: number;
  totalUnits: number;
}

export interface IOverallStat {
  totalCustomers: number;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  year: number;
  monthlyData: IMonthlyData[];
  dailyData: IDailyData[];
  // salesByCategory: Map<string, number>;
  salesByCategory: { [key: string]: number };
}

// Type definition for the OverallStat model to include static methods
export type IOverallStatModel = Model<IOverallStat, Record<string, unknown>>;
