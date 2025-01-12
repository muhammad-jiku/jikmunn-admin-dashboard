import {
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { IProduct } from '../../_interfaces';

type ProductProps = {
  data: IProduct;
  //   isSidebarOpen: boolean;
  //   setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Product({ data }: ProductProps) {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: 'none',
        backgroundColor: theme.palette.background.alt,
        borderRadius: '0.55rem',
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {data?.category}
        </Typography>
        <Typography variant='h5' component='div'>
          {data?.name}
        </Typography>
        <Typography sx={{ mb: '1.5rem' }} color={theme.palette.secondary[400]}>
          ${Number(data?.price).toFixed(2)}
        </Typography>
        {/* <Rating value={data?.rating} readOnly /> */}

        <Typography variant='body2'>{data?.description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          //   variant='primary'
          size='small'
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout='auto'
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {data?._id}</Typography>
          <Typography>Supply Left: {data?.supply}</Typography>
          <Typography>
            Yearly Sales This Year: {data?.stat.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {data?.stat.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Product;
