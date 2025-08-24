import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  Container,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear messages when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const requestData = {
      email: formData.email,
      password: formData.password,
    };

    // Try multiple approaches for CORS issues
    const urls = [
      '/api/auth/login', // Proxy approach
      'https://gometro-backend-production.up.railway.app/auth/login', // Direct approach
    ];

    for (let i = 0; i < urls.length; i++) {
      try {
        const response = await fetch(urls[i], {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          mode: i === 0 ? 'same-origin' : 'cors',
          credentials: 'omit',
          body: JSON.stringify(requestData),
        });

        const responseText = await response.text();
        let data;
        
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          if (i === urls.length - 1) {
            setError('Lỗi kết nối server. Vui lòng thử lại sau.');
            return;
          }
          continue; // Try next URL
        }

        if (response.ok && data.success) {
          setSuccess(data.message || 'Đăng nhập thành công!');
          // Store token and user data
          localStorage.setItem('token', data.data.token);
          localStorage.setItem('user', JSON.stringify(data.data.user));
          
          // Navigate to dashboard after a short delay to show success message
          setTimeout(() => {
            navigate('/dashboard');
          }, 1500);
          return; // Success, exit the loop
        } else {
          // Handle error response with format {success: false, error: "message"}
          const errorMessage = data.error || data.message || 'Đăng nhập thất bại';
          setError(errorMessage);
          return; // Got response, exit the loop
        }
      } catch (err) {
        if (i === urls.length - 1) {
          setError('Lỗi kết nối. Vui lòng thử lại sau.');
        }
      }
    }
    
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Paper
            elevation={24}
            sx={{
              padding: { xs: 3, sm: 4, md: 5 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            {/* Metro Logo */}
            <Box
              sx={{
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src="/logo.png"
                alt="Metro Logo"
                style={{
                  width: '120px',
                  height: 'auto',
                  maxHeight: '80px',
                  objectFit: 'contain',
                }}
              />
            </Box>

            <Typography 
              component="h1" 
              variant="h4" 
              sx={{ 
                mb: 1, 
                color: '#1976d2',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              Go-Metro
            </Typography>
            
            <Typography 
              component="h2" 
              variant="h6" 
              sx={{ 
                mb: 4, 
                color: '#666',
                fontWeight: 500,
              }}
            >
              Hệ thống quản lý tàu điện ngầm
            </Typography>
            
            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  width: '100%', 
                  mb: 3,
                  borderRadius: 2,
                  '& .MuiAlert-icon': {
                    fontSize: '1.5rem',
                  }
                }}
              >
                {error}
              </Alert>
            )}

            {success && (
              <Alert 
                severity="success" 
                sx={{ 
                  width: '100%', 
                  mb: 3,
                  borderRadius: 2,
                  '& .MuiAlert-icon': {
                    fontSize: '1.5rem',
                  }
                }}
              >
                {success}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: '#1976d2',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2',
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#1976d2',
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: '#1976d2',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2',
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#1976d2',
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                  mt: 4, 
                  mb: 3, 
                  py: 1.8,
                  borderRadius: 2,
                  background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  boxShadow: '0 8px 32px rgba(25, 118, 210, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1565c0, #1976d2)',
                    boxShadow: '0 12px 40px rgba(25, 118, 210, 0.4)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={28} color="inherit" />
                ) : (
                  'Đăng nhập'
                )}
              </Button>
              <Box sx={{ textAlign: 'center' }}>
                <Link 
                  href="/register" 
                  variant="body2"
                  sx={{
                    color: '#1976d2',
                    textDecoration: 'none',
                    fontWeight: 500,
                    '&:hover': {
                      textDecoration: 'underline',
                      color: '#1565c0',
                    },
                    transition: 'color 0.3s ease',
                  }}
                >
                  Chưa có tài khoản? Đăng ký ngay
                </Link>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Login; 