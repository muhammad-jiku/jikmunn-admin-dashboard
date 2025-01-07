import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import {
  IDashboardStats,
  IGeography,
  IUser,
  IUserPerformance,
} from './user.interfaces';
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

const getUserPerformance = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;

      const result = await UserServices.getUserPerformance(userId);

      sendResponse<IUserPerformance>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User performance data retrieved successfully!',
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }
);

const getCustomers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await UserServices.getCustomers();

      sendResponse<IUser[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Customers data retrieved successfully!',
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }
);

const getAdmins = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await UserServices.getAdmins();

      sendResponse<IUser[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admins data retrieved successfully!',
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }
);

const getDashboardStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await UserServices.getDashboardStats();

      sendResponse<IDashboardStats>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Dashboard data retrieved successfully!',
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }
);

const getGeography = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await UserServices.getGeography();

      sendResponse<IGeography[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Users location data retrieved successfully!',
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }
);

export const UserControllers = {
  getUser,
  getUserPerformance,
  getCustomers,
  getAdmins,
  getDashboardStats,
  getGeography,
};
