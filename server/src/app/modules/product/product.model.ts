import { model, Schema } from 'mongoose';
import { IProduct, IProductModel } from './product.interfaces';

// schema pattern for statics methods
const productSchema = new Schema<IProduct, IProductModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: false,
    },
    rating: {
      type: Number,
      required: false,
    },
    supply: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Product: IProductModel = model<IProduct, IProductModel>(
  'Product',
  productSchema
);
