import { model, Schema } from 'mongoose';
import { IOverallStat, IOverallStatModel } from './overallStat.interfaces';

// Schema pattern for statics methods
const overallStatSchema = new Schema<IOverallStat, IOverallStatModel>(
  {
    totalCustomers: {
      type: Number,
      required: true,
    },
    yearlySalesTotal: {
      type: Number,
      required: true,
    },
    yearlyTotalSoldUnits: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    monthlyData: [
      {
        month: {
          type: String,
          required: true,
        },
        totalSales: {
          type: Number,
          required: true,
        },
        totalUnits: {
          type: Number,
          required: true,
        },
      },
    ],
    dailyData: [
      {
        date: {
          type: String,
          required: true,
        },
        totalSales: {
          type: Number,
          required: true,
        },
        totalUnits: {
          type: Number,
          required: true,
        },
      },
    ],
    salesByCategory: {
      type: Map,
      of: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const OverallStat: IOverallStatModel = model<
  IOverallStat,
  IOverallStatModel
>('OverallStat', overallStatSchema);
