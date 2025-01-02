import express from 'express';
import { UserControllers } from './user.controllers';

const router = express.Router();

router.route('/:id').get(UserControllers.getUser);

export const UserRoutes = router;
