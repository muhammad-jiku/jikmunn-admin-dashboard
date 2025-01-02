import {
  AdminPanelSettingsOutlined,
  CalendarMonthOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  Groups2Outlined,
  HomeOutlined,
  PieChartOutlined,
  PointOfSaleOutlined,
  PublicOutlined,
  ReceiptLongOutlined,
  SettingsOutlined,
  ShoppingCartOutlined,
  TodayOutlined,
  TrendingUpOutlined,
} from '@mui/icons-material';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import profileImage from '../_assets/profile.jpg';
import { IUser } from '../_interfaces';
import { FlexBetween } from './FlexBetween';

type SidebarProps = {
  data: IUser;
  drawerWidth: string;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isNonMobile: boolean;
};

function Sidebar({
  data,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}: SidebarProps) {
  const navItems = [
    { text: 'Dashboard', icon: <HomeOutlined /> },
    { text: 'Client Facing', icon: null },
    { text: 'Products', icon: <ShoppingCartOutlined /> },
    { text: 'Customers', icon: <Groups2Outlined /> },
    { text: 'Transactions', icon: <ReceiptLongOutlined /> },
    { text: 'Geography', icon: <PublicOutlined /> },
    { text: 'Sales', icon: null },
    { text: 'Overview', icon: <PointOfSaleOutlined /> },
    { text: 'Daily', icon: <TodayOutlined /> },
    { text: 'Monthly', icon: <CalendarMonthOutlined /> },
    { text: 'Breakdown', icon: <PieChartOutlined /> },
    { text: 'Management', icon: null },
    { text: 'Admin', icon: <AdminPanelSettingsOutlined /> },
    { text: 'Performance', icon: <TrendingUpOutlined /> },
  ];

  const { pathname } = useLocation();
  const [active, setActive] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component='nav'>
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant='persistent'
          anchor='left'
          sx={{
            width: drawerWidth,
            '& .MuiDrawer-paper': {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: 'border-box',
              width: drawerWidth,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between', // Ensures profile stays at the bottom
            },
          }}
        >
          {/* Sidebar Header */}
          <Box m='1.5rem 2rem 2rem 3rem'>
            <FlexBetween color={theme.palette.secondary.main}>
              <Box display='flex' alignItems='center' gap='0.5rem'>
                <Typography variant='h4' fontWeight='bold'>
                  My Dashboard
                </Typography>
              </Box>
              {!isNonMobile && (
                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                  <ChevronLeft />
                </IconButton>
              )}
            </FlexBetween>
          </Box>

          {/* Scrollable Navigation Items */}
          <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography
                      key={text}
                      sx={{ m: '2.25rem 0 1rem 3rem', textAlign: 'left' }}
                    >
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : 'transparent',
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: '2rem',
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: 'auto' }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          {/* Fixed Profile Section */}
          <Box
            sx={{ p: '1rem', borderTop: `1px solid ${theme.palette.divider}` }}
          >
            <FlexBetween textTransform='none' gap='1rem'>
              <Box
                component='img'
                alt='profile'
                src={profileImage}
                height='40px'
                width='40px'
                borderRadius='50%'
                sx={{ objectFit: 'cover' }}
              />
              <Box textAlign='left'>
                <Typography
                  fontWeight='bold'
                  fontSize='0.9rem'
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {data ? data?.name : 'Profile'}
                </Typography>
                <Typography
                  fontSize='0.8rem'
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {data ? data?.occupation : 'Businessman'}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: '25px',
                }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
}

export default Sidebar;
