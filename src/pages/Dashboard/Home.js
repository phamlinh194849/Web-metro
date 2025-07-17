import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import {
  People,
  CreditCard,
  LocationOn,
  Schedule,
} from '@mui/icons-material';

const StatCard = ({ title, value, icon, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box
          sx={{
            backgroundColor: color,
            borderRadius: '50%',
            p: 1,
            mr: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const Home = () => {
  const stats = [
    {
      title: 'Tổng người dùng',
      value: '1,234',
      icon: <People sx={{ color: 'white' }} />,
      color: '#1976d2',
    },
    {
      title: 'Thẻ đã cấp',
      value: '5,678',
      icon: <CreditCard sx={{ color: 'white' }} />,
      color: '#2e7d32',
    },
    {
      title: 'Trạm hoạt động',
      value: '25',
      icon: <LocationOn sx={{ color: 'white' }} />,
      color: '#ed6c02',
    },
    {
      title: 'Chuyến hôm nay',
      value: '156',
      icon: <Schedule sx={{ color: 'white' }} />,
      color: '#9c27b0',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        Trang chủ
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Hoạt động gần đây
            </Typography>
            <Box sx={{ height: '300px', overflow: 'auto' }}>
              {/* TODO: Add recent activity list */}
              <Typography variant="body2" color="text.secondary">
                Danh sách hoạt động gần đây sẽ được hiển thị ở đây...
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Thống kê nhanh
            </Typography>
            <Box sx={{ height: '300px' }}>
              {/* TODO: Add quick stats chart */}
              <Typography variant="body2" color="text.secondary">
                Biểu đồ thống kê sẽ được hiển thị ở đây...
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home; 