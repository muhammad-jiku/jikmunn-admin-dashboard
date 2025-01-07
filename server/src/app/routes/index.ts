import express from 'express';
import { OverallStatRoutes } from '../modules/overallStat/overallStat.routes';
import { ProductRoutes } from '../modules/product/product.routes';
import { TransactionRoutes } from '../modules/transaction/transaction.routes';
import { UserRoutes } from '../modules/user/user.routes';

const routes = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/transactions',
    route: TransactionRoutes,
  },
  {
    path: '/sales',
    route: OverallStatRoutes,
  },
];

moduleRoutes.forEach((route) => routes.use(route.path, route.route));

export default routes;
