import express from 'express';
import { UserControllers } from './user.controllers';

const router = express.Router();

router.route('/customers').get(UserControllers.getCustomers);
router.route('/dashboard').get(UserControllers.getDashboardStats);
router.route('/:userId').get(UserControllers.getUser);

export const UserRoutes = router;
