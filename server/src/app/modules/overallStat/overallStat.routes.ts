import express from 'express';
import { OverallStatControllers } from './overallStat.controllers';

const router = express.Router();

router.route('/').get(OverallStatControllers.getSales);

export const OverallStatRoutes = router;
