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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverallStatServices = void 0;
const overallStat_model_1 = require("./overallStat.model");
const getSales = () => __awaiter(void 0, void 0, void 0, function* () {
    const overallStats = yield overallStat_model_1.OverallStat.find().lean();
    // Convert salesByCategory to Map<string, number>
    const formattedStats = overallStats.map((stat) => (Object.assign(Object.assign({}, stat), { salesByCategory: stat.salesByCategory && Object.keys(stat.salesByCategory).length > 0
            ? stat.salesByCategory
            : { defaultCategory: 0 } })));
    return formattedStats;
});
exports.OverallStatServices = {
    getSales,
};
