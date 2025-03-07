import {
  DownloadOutlined,
  Email,
  PersonAdd,
  PointOfSale,
  Traffic,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import OverviewChart from '../../_components/Charts/OverviewChart';
import { FlexBetween } from '../../_components/FlexBetween';
import Header from '../../_components/Header';
import StatBox from '../../_components/StatBox';
import { ITransaction } from '../../_interfaces';
import { useGetDashboardQuery } from '../../_store/api';

function Dashboard() {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery('(min-width: 1200px)');
  const { data, isLoading } = useGetDashboardQuery();

  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'userId',
      headerName: 'User ID',
      flex: 1,
    },
    // {
    //   field: 'createdAt',
    //   headerName: 'CreatedAt',
    //   flex: 1,
    // },
    {
      field: 'products',
      headerName: '# of Products',
      flex: 0.5,
      sortable: false,
      renderCell: (params: GridRenderCellParams<ITransaction>) =>
        params.value.length,
    },
    {
      field: 'cost',
      headerName: 'Cost',
      flex: 1,
      renderCell: (params: GridRenderCellParams<ITransaction>) =>
        `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m='1.5rem 2.5rem'>
      <FlexBetween>
        <Header title='DASHBOARD' subtitle='Welcome to your dashboard' />

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '10px 20px',
            }}
          >
            <DownloadOutlined sx={{ mr: '10px' }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt='20px'
        display='grid'
        gridTemplateColumns='repeat(12, 1fr)'
        gridAutoRows='160px'
        gap='20px'
        sx={{
          '& > div': {
            gridColumn: isNonMediumScreens ? undefined : 'span 12',
          },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title='Total Customers'
          value={data && data?.data?.totalCustomers}
          increase='+14%'
          description='Since last month'
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: '26px' }}
            />
          }
        />
        <StatBox
          title='Sales Today'
          value={data && data?.data?.todayStats?.totalSales}
          increase='+21%'
          description='Since last month'
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: '26px' }}
            />
          }
        />
        <StatBox
          title='Monthly Sales'
          value={data && data?.data?.thisMonthStats?.totalSales}
          increase='+5%'
          description='Since last month'
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: '26px' }}
            />
          }
        />
        <StatBox
          title='Yearly Sales'
          value={data && data?.data?.yearlySalesTotal}
          increase='+43%'
          description='Since last month'
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: '26px' }}
            />
          }
        />

        {/* ROW 2 */}
        <Box
          sx={{
            gridColumn: 'span 12',
            gridRow: 'span 2',
            backgroundColor: theme.palette.background.alt,
            p: '1rem',
            borderRadius: '0.55rem',
          }}
        >
          <OverviewChart isDashboard={true} view='sales' />
        </Box>
        {/* ROW 3 */}
        <Box
          gridColumn='span 8'
          gridRow='span 3'
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
              borderRadius: '1rem',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: 'none',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: 'none',
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: theme.palette.background.alt,
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: 'none',
            },
            '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={data?.data?.transactions || []}
            columns={columns}
          />
        </Box>
        <Box
          gridColumn='span 4'
          gridRow='span 3'
          sx={{
            backgroundColor: theme.palette.background.alt,
            p: '1.5rem',
            borderRadius: '0.55rem',
          }}
        >
          <Typography variant='h6' sx={{ color: theme.palette.secondary[100] }}>
            Sales By Category
          </Typography>
          <Typography
            p='0 0.6rem'
            fontSize='0.8rem'
            sx={{ color: theme.palette.secondary[200] }}
          >
            Breakdown of real states and information via category for revenue
            made for this year and total sales.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
