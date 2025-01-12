import { Box, useMediaQuery } from '@mui/material';
import Header from '../../_components/Header';
import Product from '../../_components/Products/Product';
import { useGetProductsQuery } from '../../_store/api';

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery('(min-width: 1000px)');

  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='PRODUCTS' subtitle='See your list of products.' />
      {isLoading ? (
        <>Loading...</>
      ) : (
        <Box
          mt='20px'
          display='grid'
          gridTemplateColumns='repeat(4, minmax(0, 1fr))'
          justifyContent='space-between'
          rowGap='20px'
          columnGap='1.33%'
          sx={{
            '& > div': {
              gridColumn: isNonMobile ? undefined : 'span 4',
            },
          }}
        >
          {data?.data?.map((product, index) => (
            <Product key={index} data={product} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Products;
