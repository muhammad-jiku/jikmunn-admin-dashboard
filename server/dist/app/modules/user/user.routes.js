"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controllers_1 = require("./user.controllers");
const router = express_1.default.Router();
router.route('/customers').get(user_controllers_1.UserControllers.getCustomers);
router.route('/admins').get(user_controllers_1.UserControllers.getAdmins);
router.route('/dashboard').get(user_controllers_1.UserControllers.getDashboardStats);
router.route('/location').get(user_controllers_1.UserControllers.getGeography);
router.route('/:email').get(user_controllers_1.UserControllers.getUser);
router.route('/:email/performance').get(user_controllers_1.UserControllers.getUserPerformance);
exports.UserRoutes = router;
