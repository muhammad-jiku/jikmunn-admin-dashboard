"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverallStat = void 0;
const mongoose_1 = require("mongoose");
// Schema pattern for statics methods
const overallStatSchema = new mongoose_1.Schema({
    totalCustomers: {
        type: Number,
        required: true,
    },
    yearlySalesTotal: {
        type: Number,
        required: true,
    },
    yearlyTotalSoldUnits: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    monthlyData: [
        {
            month: {
                type: String,
                required: true,
            },
            totalSales: {
                type: Number,
                required: true,
            },
            totalUnits: {
                type: Number,
                required: true,
            },
        },
    ],
    dailyData: [
        {
            date: {
                type: String,
                required: true,
            },
            totalSales: {
                type: Number,
                required: true,
            },
            totalUnits: {
                type: Number,
                required: true,
            },
        },
    ],
    salesByCategory: {
        type: Map,
        of: Number,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (_, ret) => {
            // Ensure `salesByCategory` is converted to a plain object
            ret.salesByCategory = Object.fromEntries(ret.salesByCategory || []);
            return ret;
        },
    },
});
exports.OverallStat = (0, mongoose_1.model)('OverallStat', overallStatSchema);
