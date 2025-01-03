import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IProduct } from './product.interfaces';
import { Product } from './product.model';

const getProducts = async (): Promise<IProduct[] | null> => {
  const productsResult = await Product.find();

  if (!productsResult) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sorry, nothing found!');
  }

  return productsResult;
};

export const ProductServices = {
  getProducts,
};
