import express from 'express';
import { UserControllers } from './user.controllers';

const router = express.Router();

router.route('/:userId').get(UserControllers.getUser);

export const UserRoutes = router;
