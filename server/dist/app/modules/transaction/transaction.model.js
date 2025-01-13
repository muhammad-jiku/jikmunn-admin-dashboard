"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const mongoose_1 = require("mongoose");
// schema pattern for statics methods
const transactionSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
    },
    cost: {
        type: String,
        required: true,
    },
    products: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: 'Product',
        },
    ],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Transaction = (0, mongoose_1.model)('Transaction', transactionSchema);
