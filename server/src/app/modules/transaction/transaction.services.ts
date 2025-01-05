import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { transactionSearchableFields } from './transaction.constants';
import { ITransaction, ITransactionFilters } from './transaction.interfaces';
import { Transaction } from './transaction.model';

const getTransactions = async (
  filters: ITransactionFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ITransaction[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions: Record<string, unknown>[] = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: transactionSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Transaction.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Transaction.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const TransactionServices = {
  getTransactions,
};
