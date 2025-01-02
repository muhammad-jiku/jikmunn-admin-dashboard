import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interfaces';
import { User } from './user.model';

const getUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findOne();
  console.log('id', id);
  console.log('result', result);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sorry, no user found!');
  }

  return result;
};

export const UserServices = {
  getUser,
};
