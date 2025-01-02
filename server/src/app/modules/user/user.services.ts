// export const getUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id);
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

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

export const UserServices = {
  getUser,
};
