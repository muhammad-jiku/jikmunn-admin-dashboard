import { model, Schema } from 'mongoose';
import { IProductStat, IProductStatModel } from './productStat.interfaces';

// schema pattern for statics methods
const productStatSchema = new Schema<IProductStat, IProductStatModel>(
  {
    productId: {
      type: String,
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const ProductStat: IProductStatModel = model<
  IProductStat,
  IProductStatModel
>('ProductStat', productStatSchema);
