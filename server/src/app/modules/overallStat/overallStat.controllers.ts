import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { IOverallStat } from './overallStat.interfaces';
import { OverallStatServices } from './overallStat.services';

const getSales = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await OverallStatServices.getSales();

      sendResponse<IOverallStat[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Sales data retrieved successfully!',
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }
);

export const OverallStatControllers = {
  getSales,
};
