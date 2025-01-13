import getCountryIso3 from 'country-iso-2-to-3';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
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

const getUser = async (id: string): Promise<IUser | null> => {
  console.log('id', id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error('Invalid ObjectId format:', id);
    return null;
  }

  const result = await User.findOne({});
  console.log('result', result);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sorry, no user found!');
  }

  return result;
};

const getUserPerformance = async (
  id: string
): Promise<IUserPerformance | null> => {
  const userWithStats = await User.aggregate([
    // { $match: { _id: new mongoose.Types.ObjectId(id) } },
    { $match: { _id: id } },
    {
      $lookup: {
        from: 'affiliatestats',
        localField: '_id',
        foreignField: 'userId',
        as: 'affiliateStats',
      },
    },
    { $unwind: '$affiliateStats' },
  ]);

  if (!userWithStats || userWithStats.length === 0) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'User not found or no stats available'
    );
  }

  // Fetch sales transactions
  const saleTransactions = await Promise.all(
    userWithStats[0].affiliateStats.affiliateSales.map((saleId: string) =>
      Transaction.findById(saleId)
    )
  );

  // Filter valid transactions
  const filteredSaleTransactions = saleTransactions.filter(
    (transaction) => transaction !== null
  );

  return {
    user: userWithStats[0],
    sales: filteredSaleTransactions,
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
