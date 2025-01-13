import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Admins from './_pages/admins';
import Breakdown from './_pages/breakdown';
import Customers from './_pages/customers';
import Daily from './_pages/daily';
import Dashboard from './_pages/dashboard';
import Geography from './_pages/geography';
import Layout from './_pages/layout';
import Monthly from './_pages/monthly';
import Overview from './_pages/overview';
import Performance from './_pages/performance';
import Products from './_pages/products';
import Transactions from './_pages/transactions';
import { RootState } from './_store';
import { themeSettings } from './_theme';
import './App.css';

function App() {
  const mode = useSelector((state: RootState) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className='app'>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {/* Layout route */}
          <Route path='/' element={<Layout />}>
            {/* Redirect to /dashboard */}
            <Route index element={<Navigate to='/dashboard' replace />} />
            {/* Dashboard and nested routes */}
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='products' element={<Products />} />
            <Route path='customers' element={<Customers />} />
            <Route path='transactions' element={<Transactions />} />
            <Route path='geography' element={<Geography />} />
            <Route path='overview' element={<Overview />} />
            <Route path='daily' element={<Daily />} />
            <Route path='monthly' element={<Monthly />} />
            <Route path='breakdown' element={<Breakdown />} />
            <Route path='admin' element={<Admins />} />
            <Route path='performance' element={<Performance />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
