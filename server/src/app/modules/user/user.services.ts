import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { OverallStat } from '../overallStat/overallStat.model';
import { Transaction } from '../transaction/transaction.model';
import { IDashboardStats, IUser } from './user.interfaces';
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

const getDashboardStats = async (): Promise<IDashboardStats | null> => {
  // Hardcoded values
  const currentMonth = 'November';
  const currentYear = 2021;
  const currentDay = '2021-11-15';

  /* Recent Transactions */
  const transactions = await Transaction.find()
    .limit(50)
    .sort({
      createdAt: -1,
    })
    .lean();

  /* Overall Stats */
  const overallStat = await OverallStat.find({ year: currentYear }).lean();

  if (!overallStat || overallStat.length === 0) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'No overall stats found for the current year'
    );
  }

  const {
    totalCustomers,
    yearlyTotalSoldUnits,
    yearlySalesTotal,
    monthlyData,
    salesByCategory,
  } = overallStat[0];

  const thisMonthStats = monthlyData.find(
    ({ month }) => month === currentMonth
  );
  const todayStats = overallStat[0].dailyData.find(
    ({ date }) => date === currentDay
  );

  const result = {
    totalCustomers,
    yearlyTotalSoldUnits,
    yearlySalesTotal,
    monthlyData,
    salesByCategory,
    thisMonthStats,
    todayStats,
    transactions,
  };

  return result;
};

export const UserServices = {
  getUser,
  getCustomers,
  getDashboardStats,
};
