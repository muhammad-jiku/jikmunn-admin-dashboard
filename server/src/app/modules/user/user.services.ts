import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interfaces';
import { User } from './user.model';

const getUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findOne({ id });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sorry, no user found!');
  }

  return result;
};

const getCustomers = async (): Promise<IUser[]> => {
  const result = await User.find({ role: 'user' });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sorry, no customer found!');
  }

  return result;
};

export const UserServices = {
  getUser,
  getCustomers,
};
