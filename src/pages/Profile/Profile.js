import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  TextField,
  Button,
  Card,
  CardContent,
  Divider,
  Alert,
} from '@mui/material';
import { Edit, Save, Cancel, Person, Email, Phone, LocationOn } from '@mui/icons-material';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [success, setSuccess] = useState('');
  const [userData, setUserData] = useState({
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0123456789',
    address: 'Quận 1, TP.HCM',
    role: 'Quản trị viên',
    department: 'IT Department',
    avatar: null,
  });

  const [formData, setFormData] = useState(userData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setFormData(userData);
  };

  const handleSave = () => {
    setUserData(formData);
    setIsEditing(false);
    setSuccess('Cập nhật thông tin thành công!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(userData);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        Thông tin cá nhân
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                mx: 'auto',
                mb: 2,
                fontSize: '3rem',
                bgcolor: '#1976d2',
              }}
            >
              {userData.avatar ? (
                <img src={userData.avatar} alt="avatar" />
              ) : (
                <Person sx={{ fontSize: '3rem' }} />
              )}
            </Avatar>
            <Typography variant="h5" sx={{ mb: 1 }}>
              {userData.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {userData.role}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {userData.department}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">
                Thông tin chi tiết
              </Typography>
              {!isEditing ? (
                <Button
                  variant="outlined"
                  startIcon={<Edit />}
                  onClick={handleEdit}
                >
                  Chỉnh sửa
                </Button>
              ) : (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    startIcon={<Save />}
                    onClick={handleSave}
                  >
                    Lưu
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Cancel />}
                    onClick={handleCancel}
                  >
                    Hủy
                  </Button>
                </Box>
              )}
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Họ và tên"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  InputProps={{
                    startAdornment: <Person sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  InputProps={{
                    startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  InputProps={{
                    startAdornment: <Phone sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Địa chỉ"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  InputProps={{
                    startAdornment: <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Thống kê hoạt động
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary">
                      156
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lần đăng nhập
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="success.main">
                      89
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Hoạt động
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Thông tin hệ thống
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  ID người dùng
                </Typography>
                <Typography variant="body1">
                  U001
                </Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Ngày tham gia
                </Typography>
                <Typography variant="body1">
                  15/01/2024
                </Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Trạng thái
                </Typography>
                <Typography variant="body1" color="success.main">
                  Hoạt động
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile; 