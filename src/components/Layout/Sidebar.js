import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
} from '@mui/material';
import {
  Home,
  CreditCard,
  People,
  Inventory,
  LocationOn,
  Schedule,
  Devices,
  Assessment,
  History,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const menuItems = [
  { text: 'Trang chủ', icon: <Home />, path: '/dashboard' },
  { text: 'Cấp phát thẻ', icon: <CreditCard />, path: '/card-issuance' },
  { text: 'Quản lý người dùng', icon: <People />, path: '/user-management' },
  { text: 'Quản lý kho thẻ RFID', icon: <Inventory />, path: '/rfid-inventory' },
  { text: 'Danh sách trạm', icon: <LocationOn />, path: '/stations' },
  { text: 'Lịch trình', icon: <Schedule />, path: '/schedules' },
  { text: 'Danh sách thiết bị', icon: <Devices />, path: '/devices' },
  { text: 'Báo cáo thống kê', icon: <Assessment />, path: '/reports' },
  { text: 'Lịch sử hoạt động', icon: <History />, path: '/activity-history' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#f5f5f5',
          borderRight: '1px solid #e0e0e0',
          mt: '64px', // Height of AppBar
          height: 'calc(100vh - 64px)',
        },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map((item, index) => (
            <React.Fragment key={item.text}>
              <ListItem disablePadding>
                <ListItemButton
                  selected={location.pathname === item.path}
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: '#e3f2fd',
                      '&:hover': {
                        backgroundColor: '#e3f2fd',
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: location.pathname === item.path ? '#1976d2' : 'inherit' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text}
                    sx={{ 
                      color: location.pathname === item.path ? '#1976d2' : 'inherit',
                      fontWeight: location.pathname === item.path ? 'bold' : 'normal'
                    }}
                  />
                </ListItemButton>
              </ListItem>
              {index < menuItems.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar; 