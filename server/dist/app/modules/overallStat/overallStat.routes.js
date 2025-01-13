"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverallStatRoutes = void 0;
const express_1 = __importDefault(require("express"));
const overallStat_controllers_1 = require("./overallStat.controllers");
const router = express_1.default.Router();
router.route('/').get(overallStat_controllers_1.OverallStatControllers.getSales);
exports.OverallStatRoutes = router;
