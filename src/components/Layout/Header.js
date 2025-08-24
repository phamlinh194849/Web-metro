import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Box,
} from '@mui/material';
import { AccountCircle, Settings, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Header = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    navigate('/profile');
  };

  const handleSettings = () => {
    handleClose();
    navigate('/settings');
  };

  const handleLogout = () => {
    handleClose();
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
        boxShadow: '0 4px 20px rgba(25, 118, 210, 0.3)',
        zIndex: (theme) => theme.zIndex.drawer + 1 
      }}
    >
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            fontWeight: 'bold',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          HỆ THỐNG QUẢN LÝ TÀU ĐIỆN NGẦM GO-METRO
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography 
            variant="body2" 
            sx={{ 
              mr: 2,
              fontWeight: 500,
              textShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            {user?.name || 'User'}
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
            sx={{
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1)',
                boxShadow: '0 4px 12px rgba(255,255,255,0.2)'
              }
            }}
          >
            <Avatar sx={{ 
              width: 36, 
              height: 36,
              border: '2px solid rgba(255,255,255,0.3)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              {user?.avatar ? (
                <img src={user.avatar} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <AccountCircle />
              )}
            </Avatar>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{
              '& .MuiPaper-root': {
                borderRadius: 2,
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                border: '1px solid rgba(255,255,255,0.1)'
              }
            }}
          >
            <MenuItem 
              onClick={handleProfile}
              sx={{
                '&:hover': {
                  backgroundColor: '#e3f2fd'
                }
              }}
            >
              <Person sx={{ mr: 1, color: '#1976d2' }} />
              Profile
            </MenuItem>
            <MenuItem 
              onClick={handleSettings}
              sx={{
                '&:hover': {
                  backgroundColor: '#e3f2fd'
                }
              }}
            >
              <Settings sx={{ mr: 1, color: '#1976d2' }} />
              Settings
            </MenuItem>
            <MenuItem 
              onClick={handleLogout}
              sx={{
                '&:hover': {
                  backgroundColor: '#ffebee'
                }
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 