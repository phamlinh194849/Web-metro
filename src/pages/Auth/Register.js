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
  Grid,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Reusable FormField component
const FormField = ({ 
  id, 
  label, 
  name, 
  type = 'text', 
  autoComplete, 
  value, 
  onChange, 
  error, 
  helperText, 
  disabled, 
  required = true 
}) => (
  <TextField
    required={required}
    fullWidth
    id={id}
    label={label}
    name={name}
    type={type}
    autoComplete={autoComplete}
    value={value}
    onChange={onChange}
    error={!!error}
    helperText={error}
    disabled={disabled}
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
);

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    password: '',
    confirmPassword: '',
    // username: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Họ tên là bắt buộc';
    }

    // if (!formData.username.trim()) {
    //   newErrors.username = 'Tên đăng nhập là bắt buộc';
    // }

    if (!formData.email.trim()) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
    }
    // Clear messages when user starts typing
    if (success) setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      setSuccess('');
      setErrors({});
      
      const requestData = {
        email: formData.email,
        full_name: formData.full_name,
        password: formData.password,
        // username: formData.username,
      };

      // Try multiple approaches for CORS issues
      const urls = [
        '/api/auth/register', // Proxy approach
        'https://gometro-backend-production.up.railway.app/auth/register', // Direct approach
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
              setErrors({ general: 'Lỗi kết nối server. Vui lòng thử lại sau.' });
              return;
            }
            continue; // Try next URL
          }

          if (response.ok && data.success) {
            setSuccess(data.message || 'Đăng ký thành công!');
            // Navigate to login after a short delay to show success message
            setTimeout(() => {
              navigate('/login');
            }, 2000);
            return; // Success, exit the loop
          } else {
            // Handle error response with format {success: false, error: "message"}
            const errorMessage = data.error || data.message || 'Đăng ký thất bại';
            setErrors({ general: errorMessage });
            return; // Got response, exit the loop
          }
        } catch (err) {
          if (i === urls.length - 1) {
            setErrors({ general: 'Lỗi kết nối. Vui lòng thử lại sau.' });
          }
        }
      }
      
      setLoading(false);
    }
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
      <Container component="main" maxWidth="md">
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

            {errors.general && (
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
                {errors.general}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <FormField
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  disabled={loading}
                />
                <FormField
                  id="full_name"
                  label="Họ tên"
                  name="full_name"
                  autoComplete="name"
                  value={formData.full_name}
                  onChange={handleChange}
                  error={errors.full_name}
                  disabled={loading}
                />
                {/* <FormField
                  id="username"
                  label="Tên đăng nhập"
                  name="username"
                  autoComplete="username"
                  value={formData.username}
                  onChange={handleChange}
                  error={errors.username}
                  disabled={loading}
                /> */}
                <FormField
                  id="password"
                  label="Mật khẩu"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  disabled={loading}
                />
                <FormField
                  id="confirmPassword"
                  label="Xác nhận mật khẩu"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  disabled={loading}
                />
              </Box>
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
                  'Đăng ký'
                )}
              </Button>
              <Box sx={{ textAlign: 'center' }}>
                <Link 
                  href="/login" 
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
                  Đã có tài khoản? Đăng nhập ngay
                </Link>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Register; 