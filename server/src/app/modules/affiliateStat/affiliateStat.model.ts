import { model, Schema } from 'mongoose';
import {
  IAffiliateStat,
  IAffiliateStatModel,
} from './affiliateStat.interfaces';

// schema pattern for statics methods
const affiliateStatSchema = new Schema<IAffiliateStat, IAffiliateStatModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    affiliateSales: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Transaction',
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

export const AffiliateStat: IAffiliateStatModel = model<
  IAffiliateStat,
  IAffiliateStatModel
>('AffiliateStat', affiliateStatSchema);
