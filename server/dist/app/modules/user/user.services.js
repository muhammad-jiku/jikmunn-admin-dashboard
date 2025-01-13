"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const country_iso_2_to_3_1 = __importDefault(require("country-iso-2-to-3"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const overallStat_model_1 = require("../overallStat/overallStat.model");
const transaction_model_1 = require("../transaction/transaction.model");
const user_model_1 = require("./user.model");
const getUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ email });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Sorry, no user found!');
    }
    return result;
});
const getUserPerformance = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const userWithStats = yield user_model_1.User.aggregate([
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
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found or no stats available');
    }
    return {
        user: userWithStats[0],
        sales: userWithStats[0].sales,
    };
});
const getCustomers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({ role: 'user' });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Sorry, no customer found!');
    }
    return result;
});
const getAdmins = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({ role: 'admin' });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Sorry, no admin found!');
    }
    return result;
});
const getDashboardStats = () => __awaiter(void 0, void 0, void 0, function* () {
    // Hardcoded values
    const currentMonth = 'November';
    const currentYear = 2021;
    const currentDay = '2021-11-15';
    /* Recent Transactions */
    const transactions = yield transaction_model_1.Transaction.find()
        .limit(50)
        .sort({
        createdAt: -1,
    })
        .lean();
    /* Overall Stats */
    const overallStat = yield overallStat_model_1.OverallStat.find({ year: currentYear }).lean();
    if (!overallStat || overallStat.length === 0) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'No overall stats found for the current year');
    }
    const { totalCustomers, yearlyTotalSoldUnits, yearlySalesTotal, monthlyData, salesByCategory, } = overallStat[0];
    const thisMonthStats = monthlyData.find(({ month }) => month === currentMonth);
    const todayStats = overallStat[0].dailyData.find(({ date }) => date === currentDay);
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
});
const getGeography = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find().lean(); // Returns plain JavaScript objects
    // Map and reduce user locations
    const mappedLocations = users.reduce((acc, user) => {
        const countryISO3 = (0, country_iso_2_to_3_1.default)(user.country);
        if (!acc[countryISO3]) {
            acc[countryISO3] = 0;
        }
        acc[countryISO3]++;
        return acc;
    }, {});
    // Format the mapped locations into the required structure
    const formattedLocations = Object.entries(mappedLocations).map(([country, count]) => ({
        id: country,
        value: count,
    }));
    return formattedLocations;
});
exports.UserServices = {
    getUser,
    getUserPerformance,
    getCustomers,
    getAdmins,
    getDashboardStats,
    getGeography,
};
