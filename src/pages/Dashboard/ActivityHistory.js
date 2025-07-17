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
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Search, FilterList, Visibility, History, Person } from '@mui/icons-material';

const ActivityHistory = () => {
  const [filters, setFilters] = useState({
    userId: '',
    activityType: '',
    dateRange: '',
    status: '',
  });
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  // Mock data
  const [activities] = useState([
    {
      id: 1,
      userId: 'U001',
      userName: 'Nguyễn Văn A',
      activityType: 'card_usage',
      description: 'Sử dụng thẻ RFID tại trạm Bến Thành',
      timestamp: '2024-01-15 08:30:00',
      location: 'Trạm Bến Thành',
      status: 'success',
      details: {
        cardNumber: 'RFID001',
        amount: 5000,
        balance: 45000,
        deviceId: 'GATE001',
      },
    },
    {
      id: 2,
      userId: 'U002',
      userName: 'Trần Thị B',
      activityType: 'card_recharge',
      description: 'Nạp tiền thẻ RFID',
      timestamp: '2024-01-15 09:15:00',
      location: 'Trạm Chợ Lớn',
      status: 'success',
      details: {
        cardNumber: 'RFID002',
        amount: 100000,
        balance: 95000,
        deviceId: 'SCANNER001',
      },
    },
    {
      id: 3,
      userId: 'U003',
      userName: 'Lê Văn C',
      activityType: 'card_issue',
      description: 'Cấp phát thẻ RFID mới',
      timestamp: '2024-01-15 10:00:00',
      location: 'Văn phòng trung tâm',
      status: 'success',
      details: {
        cardNumber: 'RFID003',
        amount: 0,
        balance: 0,
        deviceId: 'OFFICE001',
      },
    },
    {
      id: 4,
      userId: 'U001',
      userName: 'Nguyễn Văn A',
      activityType: 'card_usage',
      description: 'Sử dụng thẻ RFID tại trạm Chợ Lớn',
      timestamp: '2024-01-15 17:45:00',
      location: 'Trạm Chợ Lớn',
      status: 'failed',
      details: {
        cardNumber: 'RFID001',
        amount: 5000,
        balance: 40000,
        deviceId: 'GATE002',
        error: 'Thẻ không đủ tiền',
      },
    },
  ]);

  const handleFilterChange = (field) => (event) => {
    setFilters({
      ...filters,
      [field]: event.target.value,
    });
  };

  const handleViewDetails = (activity) => {
    setSelectedActivity(activity);
    setOpenDetailDialog(true);
  };

  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
    setSelectedActivity(null);
  };

  const getActivityTypeText = (type) => {
    switch (type) {
      case 'card_usage': return 'Sử dụng thẻ';
      case 'card_recharge': return 'Nạp tiền';
      case 'card_issue': return 'Cấp phát thẻ';
      case 'card_block': return 'Khóa thẻ';
      case 'card_unblock': return 'Mở khóa thẻ';
      default: return 'Không xác định';
    }
  };

  const getActivityTypeColor = (type) => {
    switch (type) {
      case 'card_usage': return 'primary';
      case 'card_recharge': return 'success';
      case 'card_issue': return 'info';
      case 'card_block': return 'error';
      case 'card_unblock': return 'warning';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    return status === 'success' ? 'success' : 'error';
  };

  const getStatusText = (status) => {
    return status === 'success' ? 'Thành công' : 'Thất bại';
  };

  const filteredActivities = activities.filter(activity => {
    if (filters.userId && !activity.userId.includes(filters.userId)) return false;
    if (filters.activityType && activity.activityType !== filters.activityType) return false;
    if (filters.status && activity.status !== filters.status) return false;
    return true;
  });

  const totalActivities = activities.length;
  const successfulActivities = activities.filter(activity => activity.status === 'success').length;
  const failedActivities = activities.filter(activity => activity.status === 'failed').length;

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        Lịch sử hoạt động người dùng
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <History sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
                <Box>
                  <Typography variant="h6">Tổng hoạt động</Typography>
                  <Typography variant="h4">{totalActivities}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <History sx={{ fontSize: 40, color: '#4caf50', mr: 2 }} />
                <Box>
                  <Typography variant="h6">Thành công</Typography>
                  <Typography variant="h4">{successfulActivities}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <History sx={{ fontSize: 40, color: '#f44336', mr: 2 }} />
                <Box>
                  <Typography variant="h6">Thất bại</Typography>
                  <Typography variant="h4">{failedActivities}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Bộ lọc
        </Typography>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Tìm kiếm theo ID người dùng"
              value={filters.userId}
              onChange={handleFilterChange('userId')}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Loại hoạt động</InputLabel>
              <Select
                value={filters.activityType}
                onChange={handleFilterChange('activityType')}
                label="Loại hoạt động"
              >
                <MenuItem value="">Tất cả</MenuItem>
                <MenuItem value="card_usage">Sử dụng thẻ</MenuItem>
                <MenuItem value="card_recharge">Nạp tiền</MenuItem>
                <MenuItem value="card_issue">Cấp phát thẻ</MenuItem>
                <MenuItem value="card_block">Khóa thẻ</MenuItem>
                <MenuItem value="card_unblock">Mở khóa thẻ</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Trạng thái</InputLabel>
              <Select
                value={filters.status}
                onChange={handleFilterChange('status')}
                label="Trạng thái"
              >
                <MenuItem value="">Tất cả</MenuItem>
                <MenuItem value="success">Thành công</MenuItem>
                <MenuItem value="failed">Thất bại</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              startIcon={<FilterList />}
              fullWidth
              onClick={() => setFilters({ userId: '', activityType: '', dateRange: '', status: '' })}
            >
              Xóa bộ lọc
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Thời gian</TableCell>
                <TableCell>Người dùng</TableCell>
                <TableCell>Loại hoạt động</TableCell>
                <TableCell>Mô tả</TableCell>
                <TableCell>Vị trí</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>{activity.timestamp}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ mr: 1, width: 32, height: 32 }}>
                        <Person />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {activity.userName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {activity.userId}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getActivityTypeText(activity.activityType)}
                      color={getActivityTypeColor(activity.activityType)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{activity.description}</TableCell>
                  <TableCell>{activity.location}</TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusText(activity.status)}
                      color={getStatusColor(activity.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleViewDetails(activity)}
                      color="primary"
                      size="small"
                    >
                      <Visibility />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={openDetailDialog} onClose={handleCloseDetailDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          Chi tiết hoạt động
        </DialogTitle>
        <DialogContent>
          {selectedActivity && (
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Người dùng
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedActivity.userName} ({selectedActivity.userId})
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Thời gian
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedActivity.timestamp}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Loại hoạt động
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {getActivityTypeText(selectedActivity.activityType)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Vị trí
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedActivity.location}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Số thẻ
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedActivity.details.cardNumber}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Số tiền
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedActivity.details.amount.toLocaleString()} VNĐ
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Số dư sau giao dịch
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedActivity.details.balance.toLocaleString()} VNĐ
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Thiết bị
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedActivity.details.deviceId}
                  </Typography>
                </Grid>
                {selectedActivity.details.error && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Lỗi
                    </Typography>
                    <Typography variant="body1" color="error">
                      {selectedActivity.details.error}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailDialog}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ActivityHistory; 