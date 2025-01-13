import getCountryIso3 from 'country-iso-2-to-3';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { OverallStat } from '../overallStat/overallStat.model';
import { Transaction } from '../transaction/transaction.model';
import {
  IDashboardStats,
  IGeography,
  IUser,
  IUserPerformance,
} from './user.interfaces';
import { User } from './user.model';

const getUser = async (email: string): Promise<IUser | null> => {
  const result = await User.findOne({ email });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sorry, no user found!');
  }

  return result;
};

const getUserPerformance = async (
  email: string
): Promise<IUserPerformance | null> => {
  const userWithStats = await User.aggregate([
    { $match: { email } },
    {
      $lookup: {
        from: 'affiliatestats',
        localField: '_id',
        foreignField: 'userId',
        as: 'affiliateStats',
      },
    },
    { $unwind: '$affiliateStats' },
    {
      $lookup: {
        from: 'transactions',
        localField: 'affiliateStats.affiliateSales',
        foreignField: '_id',
        as: 'sales',
      },
    },
  ]);

  if (!userWithStats || userWithStats.length === 0) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'User not found or no stats available'
    );
  }

  return {
    user: userWithStats[0],
    sales: userWithStats[0].sales,
  };
};

const getCustomers = async (): Promise<IUser[]> => {
  const result = await User.find({ role: 'user' });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sorry, no customer found!');
  }

  return result;
};

const getAdmins = async (): Promise<IUser[]> => {
  const result = await User.find({ role: 'admin' });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sorry, no admin found!');
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

const getGeography = async (): Promise<IGeography[] | null> => {
  const users = await User.find().lean(); // Returns plain JavaScript objects

  // Map and reduce user locations
  const mappedLocations = users.reduce<Record<string, number>>((acc, user) => {
    const countryISO3 = getCountryIso3(user.country);
    if (!acc[countryISO3]) {
      acc[countryISO3] = 0;
    }
    acc[countryISO3]++;
    return acc;
  }, {});

  // Format the mapped locations into the required structure
  const formattedLocations = Object.entries(mappedLocations).map(
    ([country, count]) => ({
      id: country,
      value: count,
    })
  );

  return formattedLocations;
};

export const UserServices = {
  getUser,
  getUserPerformance,
  getCustomers,
  getAdmins,
  getDashboardStats,
  getGeography,
};
