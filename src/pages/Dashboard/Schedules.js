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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Add, Edit, Delete, Schedule } from '@mui/icons-material';

const Schedules = () => {
  const [formData, setFormData] = useState({
    routeName: '',
    departureStation: '',
    arrivalStation: '',
    departureTime: '',
    arrivalTime: '',
    frequency: 'daily',
    status: 'active',
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [success, setSuccess] = useState('');

  // Mock data
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      routeName: 'Bến Thành - Chợ Lớn',
      departureStation: 'Bến Thành',
      arrivalStation: 'Chợ Lớn',
      departureTime: '06:00',
      arrivalTime: '06:30',
      frequency: 'daily',
      status: 'active',
    },
    {
      id: 2,
      routeName: 'Tân Bình - Quận 1',
      departureStation: 'Tân Bình',
      arrivalStation: 'Quận 1',
      departureTime: '07:00',
      arrivalTime: '07:45',
      frequency: 'weekdays',
      status: 'active',
    },
  ]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingSchedule) {
      setSchedules(schedules.map(schedule => 
        schedule.id === editingSchedule.id ? { ...formData, id: editingSchedule.id } : schedule
      ));
      setSuccess('Cập nhật lịch trình thành công!');
    } else {
      const newSchedule = {
        ...formData,
        id: Date.now(),
      };
      setSchedules([...schedules, newSchedule]);
      setSuccess('Thêm lịch trình thành công!');
    }
    
    handleCloseDialog();
    setFormData({
      routeName: '',
      departureStation: '',
      arrivalStation: '',
      departureTime: '',
      arrivalTime: '',
      frequency: 'daily',
      status: 'active',
    });
  };

  const handleEdit = (schedule) => {
    setEditingSchedule(schedule);
    setFormData(schedule);
    setOpenDialog(true);
  };

  const handleDelete = (scheduleId) => {
    setSchedules(schedules.filter(schedule => schedule.id !== scheduleId));
    setSuccess('Xóa lịch trình thành công!');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingSchedule(null);
    setFormData({
      routeName: '',
      departureStation: '',
      arrivalStation: '',
      departureTime: '',
      arrivalTime: '',
      frequency: 'daily',
      status: 'active',
    });
  };

  const getFrequencyText = (frequency) => {
    switch (frequency) {
      case 'daily': return 'Hàng ngày';
      case 'weekdays': return 'Ngày thường';
      case 'weekends': return 'Cuối tuần';
      default: return 'Không xác định';
    }
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'success' : 'error';
  };

  const activeSchedules = schedules.filter(schedule => schedule.status === 'active').length;

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        Lịch trình
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Schedule sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
                <Box>
                  <Typography variant="h6">Tổng lịch trình</Typography>
                  <Typography variant="h4">{schedules.length}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Schedule sx={{ fontSize: 40, color: '#4caf50', mr: 2 }} />
                <Box>
                  <Typography variant="h6">Đang hoạt động</Typography>
                  <Typography variant="h4">{activeSchedules}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">
          Danh sách lịch trình
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
        >
          Thêm lịch trình
        </Button>
      </Box>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Tuyến đường</TableCell>
                <TableCell>Trạm đi</TableCell>
                <TableCell>Trạm đến</TableCell>
                <TableCell>Giờ đi</TableCell>
                <TableCell>Giờ đến</TableCell>
                <TableCell>Tần suất</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell>{schedule.routeName}</TableCell>
                  <TableCell>{schedule.departureStation}</TableCell>
                  <TableCell>{schedule.arrivalStation}</TableCell>
                  <TableCell>{schedule.departureTime}</TableCell>
                  <TableCell>{schedule.arrivalTime}</TableCell>
                  <TableCell>
                    <Chip
                      label={getFrequencyText(schedule.frequency)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={schedule.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                      color={getStatusColor(schedule.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(schedule)} color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(schedule.id)} color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingSchedule ? 'Chỉnh sửa lịch trình' : 'Thêm lịch trình mới'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tên tuyến đường"
                  name="routeName"
                  value={formData.routeName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Trạm đi"
                  name="departureStation"
                  value={formData.departureStation}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Trạm đến"
                  name="arrivalStation"
                  value={formData.arrivalStation}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Giờ đi"
                  name="departureTime"
                  type="time"
                  value={formData.departureTime}
                  onChange={handleChange}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Giờ đến"
                  name="arrivalTime"
                  type="time"
                  value={formData.arrivalTime}
                  onChange={handleChange}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Tần suất</InputLabel>
                  <Select
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleChange}
                    label="Tần suất"
                  >
                    <MenuItem value="daily">Hàng ngày</MenuItem>
                    <MenuItem value="weekdays">Ngày thường</MenuItem>
                    <MenuItem value="weekends">Cuối tuần</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Trạng thái</InputLabel>
                  <Select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    label="Trạng thái"
                  >
                    <MenuItem value="active">Hoạt động</MenuItem>
                    <MenuItem value="inactive">Tạm dừng</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingSchedule ? 'Cập nhật' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Schedules; 