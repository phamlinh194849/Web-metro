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
          background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)',
          borderRight: '1px solid rgba(0,0,0,0.08)',
          mt: '64px', // Height of AppBar
          height: 'calc(100vh - 64px)',
          boxShadow: '4px 0 20px rgba(0,0,0,0.08)',
        },
      }}
    >
      <Box sx={{ overflow: 'auto', py: 2 }}>
        <List>
          {menuItems.map((item, index) => (
            <React.Fragment key={item.text}>
              <ListItem disablePadding sx={{ px: 1, mb: 0.5 }}>
                <ListItemButton
                  selected={location.pathname === item.path}
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    borderRadius: 2,
                    mx: 1,
                    transition: 'all 0.3s ease',
                    '&.Mui-selected': {
                      background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                      color: 'white',
                      boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1565c0, #1976d2)',
                        transform: 'translateX(4px)',
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'white',
                      },
                    },
                    '&:hover': {
                      backgroundColor: '#e3f2fd',
                      transform: 'translateX(4px)',
                      boxShadow: '0 2px 8px rgba(25, 118, 210, 0.15)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ 
                    color: location.pathname === item.path ? 'white' : '#666',
                    minWidth: 40,
                    transition: 'all 0.3s ease'
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text}
                    sx={{ 
                      color: location.pathname === item.path ? 'white' : '#333',
                      fontWeight: location.pathname === item.path ? 'bold' : 500,
                      '& .MuiTypography-root': {
                        fontSize: '0.9rem',
                        transition: 'all 0.3s ease'
                      }
                    }}
                  />
                </ListItemButton>
              </ListItem>
              {index < menuItems.length - 1 && (
                <Divider sx={{ 
                  mx: 2, 
                  my: 1,
                  opacity: 0.3
                }} />
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar; 