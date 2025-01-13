"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const overallStat_routes_1 = require("../modules/overallStat/overallStat.routes");
const product_routes_1 = require("../modules/product/product.routes");
const transaction_routes_1 = require("../modules/transaction/transaction.routes");
const user_routes_1 = require("../modules/user/user.routes");
const routes = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: user_routes_1.UserRoutes,
    },
    {
        path: '/products',
        route: product_routes_1.ProductRoutes,
    },
    {
        path: '/transactions',
        route: transaction_routes_1.TransactionRoutes,
    },
    {
        path: '/sales',
        route: overallStat_routes_1.OverallStatRoutes,
    },
];
moduleRoutes.forEach((route) => routes.use(route.path, route.route));
exports.default = routes;
