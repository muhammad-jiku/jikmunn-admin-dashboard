import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { IProduct } from './product.interfaces';
import { ProductServices } from './product.services';

const getProducts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await ProductServices.getProducts();

      sendResponse<IProduct[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Products data retrieved successfully!',
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }
);

export const ProductControllers = {
  getProducts,
};
