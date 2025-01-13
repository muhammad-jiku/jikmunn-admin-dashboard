import { Box, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Navbar from '../../_components/Navbar';
import Sidebar from '../../_components/Sidebar';
import { IGlobalState } from '../../_interfaces';
import { useGetUserQuery } from '../../_store/api';

function Layout() {
  const isNonMobile = useMediaQuery('(min-width: 600px)');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const email = useSelector((state: IGlobalState) => state.global.email);
  const { data } = useGetUserQuery(email);
  const user = data?.data;

  return (
    <Box display={isNonMobile ? 'flex' : 'block'} width='100%' height='100%'>
      <Sidebar
        data={user}
        isNonMobile={isNonMobile}
        drawerWidth='250px'
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <Box flexGrow={1}>
        <Navbar
          data={user}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
