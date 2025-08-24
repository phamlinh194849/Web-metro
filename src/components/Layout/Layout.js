import React from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children, user }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      <CssBaseline />
      <Header user={user} />
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            background: 'transparent',
            overflow: 'auto',
            minHeight: '100vh',
          }}
        >
          <Toolbar /> {/* Spacer for fixed AppBar */}
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout; 