import express from 'express';
import { TransactionControllers } from './transaction.controllers';

const router = express.Router();

router.route('/').get(TransactionControllers.getTransactionns);

export const TransactionRoutes = router;
