import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { IUser } from './user.interfaces';
import { UserServices } from './user.services';

const getUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;

      const result = await UserServices.getUser(userId);

      sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User data retrieved successfully!',
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }
);

export const UserControllers = {
  getUser,

};
