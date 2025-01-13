import express from 'express';
import { UserControllers } from './user.controllers';

const router = express.Router();

router.route('/customers').get(UserControllers.getCustomers);
router.route('/admins').get(UserControllers.getCustomers);
router.route('/dashboard').get(UserControllers.getDashboardStats);
router.route('/location').get(UserControllers.getGeography);
router.route('/:email').get(UserControllers.getUser);
router.route('/:email/performance').get(UserControllers.getUserPerformance);

export const UserRoutes = router;
