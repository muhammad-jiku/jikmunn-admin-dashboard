import { Box, useTheme } from '@mui/material';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { useState } from 'react';
import CustomToolbarWrapper from '../../_components/DataGrid/CustomToolbarWrapper';
import Header from '../../_components/Header';
import { ITransaction } from '../../_interfaces';
import { useGetTransactionsQuery } from '../../_store/api';

function Transactions() {
  const theme = useTheme();

  // State for backend query parameters
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(20);
  const [sort, setSort] = useState<Record<string, string>>({});
  const [search, setSearch] = useState<string>('');

  // State for search input
  const [searchInput, setSearchInput] = useState<string>('');

  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

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
    //   headerName: 'Created At',
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
      <Header title='TRANSACTIONS' subtitle='Entire list of transactions' />
      <Box
        height='80vh'
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
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
            backgroundColor: theme.palette.primary.light,
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
          rows={data?.data || []}
          columns={columns}
          rowCount={data?.meta.total || 0}
          paginationMode='server'
          sortingMode='server'
          paginationModel={{ page, pageSize }}
          onPaginationModelChange={(model) => {
            setPage(model.page);
            setPageSize(model.pageSize);
          }}
          onSortModelChange={(newSortModel) => {
            const sortModel = newSortModel[0] || {};
            setSort({
              field: sortModel.field || '',
              sort: sortModel.sort || '',
            });
          }}
          slots={{
            toolbar: (props) => (
              <CustomToolbarWrapper
                {...props}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                setSearch={setSearch}
              />
            ),
          }}
        />
      </Box>
    </Box>
  );
}

export default Transactions;
