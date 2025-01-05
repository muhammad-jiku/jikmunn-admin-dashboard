import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import { catchAsync } from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import { sendResponse } from '../../../shared/sendResponse';
import { transactionFilterableFields } from './transaction.constants';
import { ITransaction } from './transaction.interfaces';
import { TransactionServices } from './transaction.services';

const getTransactionns = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filters = pick(req.query, transactionFilterableFields);
      const paginationOptions = pick(req.query, paginationFields);

      const result = await TransactionServices.getTransactions(
        filters,
        paginationOptions
      );

      sendResponse<ITransaction[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All transactions data retrieved successfully!',
        meta: result.meta,
        data: result.data,
      });
    } catch (error) {
      return next(error);
    }
  }
);

export const TransactionControllers = {
  getTransactionns,
};
