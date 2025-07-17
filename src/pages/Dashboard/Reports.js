import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Assessment, TrendingUp, TrendingDown, People, CreditCard } from '@mui/icons-material';

const Reports = () => {
  const [reportType, setReportType] = useState('daily');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '',
  });

  // Mock data for reports
  const [reports] = useState([
    {
      id: 1,
      date: '2024-01-15',
      totalUsers: 1234,
      totalCards: 5678,
      activeCards: 5432,
      revenue: 15000000,
      transactions: 8900,
    },
    {
      id: 2,
      date: '2024-01-14',
      totalUsers: 1220,
      totalCards: 5650,
      activeCards: 5400,
      revenue: 14800000,
      transactions: 8750,
    },
    {
      id: 3,
      date: '2024-01-13',
      totalUsers: 1205,
      totalCards: 5620,
      activeCards: 5380,
      revenue: 14500000,
      transactions: 8600,
    },
  ]);

  const handleDateChange = (field) => (event) => {
    setDateRange({
      ...dateRange,
      [field]: event.target.value,
    });
  };

  const generateReport = () => {
    // TODO: Implement actual report generation with API
    console.log('Generating report:', { reportType, dateRange });
  };

  const exportReport = () => {
    // TODO: Implement export functionality
    console.log('Exporting report');
  };

  const getGrowthRate = (current, previous) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const latestReport = reports[0];
  const previousReport = reports[1];

  const stats = [
    {
      title: 'Tổng người dùng',
      value: latestReport.totalUsers.toLocaleString(),
      icon: <People sx={{ color: 'white' }} />,
      color: '#1976d2',
      growth: getGrowthRate(latestReport.totalUsers, previousReport.totalUsers),
    },
    {
      title: 'Tổng thẻ',
      value: latestReport.totalCards.toLocaleString(),
      icon: <CreditCard sx={{ color: 'white' }} />,
      color: '#2e7d32',
      growth: getGrowthRate(latestReport.totalCards, previousReport.totalCards),
    },
    {
      title: 'Doanh thu',
      value: `${(latestReport.revenue / 1000000).toFixed(1)}M VNĐ`,
      icon: <TrendingUp sx={{ color: 'white' }} />,
      color: '#ed6c02',
      growth: getGrowthRate(latestReport.revenue, previousReport.revenue),
    },
    {
      title: 'Giao dịch',
      value: latestReport.transactions.toLocaleString(),
      icon: <Assessment sx={{ color: 'white' }} />,
      color: '#9c27b0',
      growth: getGrowthRate(latestReport.transactions, previousReport.transactions),
    },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        Báo cáo thống kê
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Tùy chọn báo cáo
        </Typography>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Loại báo cáo</InputLabel>
              <Select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                label="Loại báo cáo"
              >
                <MenuItem value="daily">Hàng ngày</MenuItem>
                <MenuItem value="weekly">Hàng tuần</MenuItem>
                <MenuItem value="monthly">Hàng tháng</MenuItem>
                <MenuItem value="yearly">Hàng năm</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Từ ngày"
              type="date"
              value={dateRange.startDate}
              onChange={handleDateChange('startDate')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Đến ngày"
              type="date"
              value={dateRange.endDate}
              onChange={handleDateChange('endDate')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                onClick={generateReport}
                fullWidth
              >
                Tạo báo cáo
              </Button>
              <Button
                variant="outlined"
                onClick={exportReport}
              >
                Xuất
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      backgroundColor: stat.color,
                      borderRadius: '50%',
                      p: 1,
                      mr: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" component="div">
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                      {stat.value}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {parseFloat(stat.growth) >= 0 ? (
                    <TrendingUp sx={{ color: '#4caf50', mr: 1, fontSize: 16 }} />
                  ) : (
                    <TrendingDown sx={{ color: '#f44336', mr: 1, fontSize: 16 }} />
                  )}
                  <Typography
                    variant="body2"
                    sx={{
                      color: parseFloat(stat.growth) >= 0 ? '#4caf50' : '#f44336',
                      fontWeight: 'bold',
                    }}
                  >
                    {stat.growth}%
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6">
            Báo cáo chi tiết
          </Typography>
        </Box>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Ngày</TableCell>
                <TableCell align="right">Tổng người dùng</TableCell>
                <TableCell align="right">Tổng thẻ</TableCell>
                <TableCell align="right">Thẻ hoạt động</TableCell>
                <TableCell align="right">Doanh thu (VNĐ)</TableCell>
                <TableCell align="right">Giao dịch</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.date}</TableCell>
                  <TableCell align="right">{report.totalUsers.toLocaleString()}</TableCell>
                  <TableCell align="right">{report.totalCards.toLocaleString()}</TableCell>
                  <TableCell align="right">{report.activeCards.toLocaleString()}</TableCell>
                  <TableCell align="right">{report.revenue.toLocaleString()}</TableCell>
                  <TableCell align="right">{report.transactions.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Biểu đồ doanh thu
            </Typography>
            <Box sx={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Biểu đồ doanh thu sẽ được hiển thị ở đây...
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Biểu đồ giao dịch
            </Typography>
            <Box sx={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Biểu đồ giao dịch sẽ được hiển thị ở đây...
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reports; 