import express from 'express';
import { ProductControllers } from './product.controllers';

const router = express.Router();

router.route('/').get(ProductControllers.getProducts);

export const ProductRoutes = router;
