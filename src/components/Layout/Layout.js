import React from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children, user }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <CssBaseline />
      <Header user={user} />
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: '#fafafa',
            overflow: 'auto',
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