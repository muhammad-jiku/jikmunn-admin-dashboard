"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStat = void 0;
const mongoose_1 = require("mongoose");
// schema pattern for statics methods
const productStatSchema = new mongoose_1.Schema({
    productId: {
        type: String,
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
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.ProductStat = (0, mongoose_1.model)('ProductStat', productStatSchema);
