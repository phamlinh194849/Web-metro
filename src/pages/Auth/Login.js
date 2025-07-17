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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // TODO: Implement actual login logic with API
    if (formData.email && formData.password) {
      // Simulate login success
      localStorage.setItem('user', JSON.stringify({
        id: 1,
        name: 'Admin User',
        email: formData.email,
        role: 'admin',
      }));
      navigate('/dashboard');
    } else {
      setError('Vui lòng nhập đầy đủ thông tin');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h4" sx={{ mb: 3, color: '#1976d2' }}>
            Metro Management System
          </Typography>
          <Typography component="h2" variant="h6" sx={{ mb: 3 }}>
            Đăng nhập
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              Đăng nhập
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link href="/register" variant="body2">
                Chưa có tài khoản? Đăng ký ngay
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login; 