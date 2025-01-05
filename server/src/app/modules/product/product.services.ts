import { ProductStat } from '../productStat/productStat.model';
import { IProduct } from './product.interfaces';
import { Product } from './product.model';

const getProducts = async (): Promise<IProduct[] | null> => {
  const productsResult = await Product.find().lean(); // Returns plain JavaScript objects

  const productsWithStats = await Promise.all(
    productsResult.map(async (product) => {
      const stat = await ProductStat.find({
        productId: product._id,
      }).lean();
      return {
        ...product,
        stat,
      };
    })
  );

  return productsWithStats;
};

export const ProductServices = {
  getProducts,
};
