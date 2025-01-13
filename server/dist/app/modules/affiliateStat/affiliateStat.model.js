"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AffiliateStat = void 0;
const mongoose_1 = require("mongoose");
// schema pattern for statics methods
const affiliateStatSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    affiliateSales: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Transaction',
        },
    ],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.AffiliateStat = (0, mongoose_1.model)('AffiliateStat', affiliateStatSchema);
