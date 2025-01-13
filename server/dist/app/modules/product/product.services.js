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
exports.ProductServices = void 0;
const productStat_model_1 = require("../productStat/productStat.model");
const product_model_1 = require("./product.model");
const getProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const productsResult = yield product_model_1.Product.find().lean(); // Returns plain JavaScript objects
    const productsWithStats = yield Promise.all(productsResult.map((product) => __awaiter(void 0, void 0, void 0, function* () {
        const stat = yield productStat_model_1.ProductStat.find({
            productId: product._id,
        }).lean();
        return Object.assign(Object.assign({}, product), { stat });
    })));
    return productsWithStats;
});
exports.ProductServices = {
    getProducts,
};
