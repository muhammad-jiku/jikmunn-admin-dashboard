import express from 'express';
import { ProductRoutes } from '../modules/product/product.routes';
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
];

moduleRoutes.forEach((route) => routes.use(route.path, route.route));

export default routes;
