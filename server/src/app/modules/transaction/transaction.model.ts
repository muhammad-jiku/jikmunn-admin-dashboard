import { model, Schema, Types } from 'mongoose';
import { ITransaction, ITransactionModel } from './transaction.interfaces';

// schema pattern for statics methods
const transactionSchema = new Schema<ITransaction, ITransactionModel>(
  {
    userId: {
      type: String,
      required: true,
    },
    cost: {
      type: String,
      required: true,
    },
    products: [
      {
        type: Types.ObjectId,
        ref: 'Product',
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

export const Transaction: ITransactionModel = model<
  ITransaction,
  ITransactionModel
>('Transaction', transactionSchema);
