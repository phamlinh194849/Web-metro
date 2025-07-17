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
  Avatar,
} from '@mui/material';
import { Add, Edit, Delete, Devices as DevicesIcon } from '@mui/icons-material';

const Devices = () => {
  const [formData, setFormData] = useState({
    deviceId: '',
    name: '',
    type: 'gate',
    location: '',
    status: 'active',
    lastMaintenance: '',
    description: '',
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [editingDevice, setEditingDevice] = useState(null);
  const [success, setSuccess] = useState('');

  // Mock data
  const [devices, setDevices] = useState([
    {
      id: 1,
      deviceId: 'GATE001',
      name: 'Cổng soát vé 1',
      type: 'gate',
      location: 'Trạm Bến Thành',
      status: 'active',
      lastMaintenance: '2024-01-10',
      description: 'Cổng soát vé chính',
    },
    {
      id: 2,
      deviceId: 'SCANNER001',
      name: 'Máy quét thẻ 1',
      type: 'scanner',
      location: 'Trạm Chợ Lớn',
      status: 'maintenance',
      lastMaintenance: '2024-01-15',
      description: 'Máy quét thẻ RFID',
    },
    {
      id: 3,
      deviceId: 'CAM001',
      name: 'Camera giám sát 1',
      type: 'camera',
      location: 'Trạm Tân Bình',
      status: 'active',
      lastMaintenance: '2024-01-08',
      description: 'Camera an ninh',
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
    
    if (editingDevice) {
      setDevices(devices.map(device => 
        device.id === editingDevice.id ? { ...formData, id: editingDevice.id } : device
      ));
      setSuccess('Cập nhật thiết bị thành công!');
    } else {
      const newDevice = {
        ...formData,
        id: Date.now(),
      };
      setDevices([...devices, newDevice]);
      setSuccess('Thêm thiết bị thành công!');
    }
    
    handleCloseDialog();
    setFormData({
      deviceId: '',
      name: '',
      type: 'gate',
      location: '',
      status: 'active',
      lastMaintenance: '',
      description: '',
    });
  };

  const handleEdit = (device) => {
    setEditingDevice(device);
    setFormData(device);
    setOpenDialog(true);
  };

  const handleDelete = (deviceId) => {
    setDevices(devices.filter(device => device.id !== deviceId));
    setSuccess('Xóa thiết bị thành công!');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingDevice(null);
    setFormData({
      deviceId: '',
      name: '',
      type: 'gate',
      location: '',
      status: 'active',
      lastMaintenance: '',
      description: '',
    });
  };

  const getTypeText = (type) => {
    switch (type) {
      case 'gate': return 'Cổng soát vé';
      case 'scanner': return 'Máy quét thẻ';
      case 'camera': return 'Camera';
      case 'display': return 'Màn hình';
      default: return 'Không xác định';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'gate': return 'primary';
      case 'scanner': return 'secondary';
      case 'camera': return 'success';
      case 'display': return 'warning';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'maintenance': return 'warning';
      case 'inactive': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Hoạt động';
      case 'maintenance': return 'Bảo trì';
      case 'inactive': return 'Không hoạt động';
      default: return 'Không xác định';
    }
  };

  const activeDevices = devices.filter(device => device.status === 'active').length;
  const maintenanceDevices = devices.filter(device => device.status === 'maintenance').length;

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        Danh sách thiết bị
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
                <DevicesIcon sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
                <Box>
                  <Typography variant="h6">Tổng thiết bị</Typography>
                  <Typography variant="h4">{devices.length}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <DevicesIcon sx={{ fontSize: 40, color: '#4caf50', mr: 2 }} />
                <Box>
                  <Typography variant="h6">Đang hoạt động</Typography>
                  <Typography variant="h4">{activeDevices}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <DevicesIcon sx={{ fontSize: 40, color: '#ff9800', mr: 2 }} />
                <Box>
                  <Typography variant="h6">Đang bảo trì</Typography>
                  <Typography variant="h4">{maintenanceDevices}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">
          Chi tiết thiết bị
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
        >
          Thêm thiết bị
        </Button>
      </Box>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Mã thiết bị</TableCell>
                <TableCell>Tên thiết bị</TableCell>
                <TableCell>Loại</TableCell>
                <TableCell>Vị trí</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Bảo trì cuối</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {devices.map((device) => (
                <TableRow key={device.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ mr: 1, bgcolor: '#1976d2' }}>
                        <DevicesIcon />
                      </Avatar>
                      {device.deviceId}
                    </Box>
                  </TableCell>
                  <TableCell>{device.name}</TableCell>
                  <TableCell>
                    <Chip
                      label={getTypeText(device.type)}
                      color={getTypeColor(device.type)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{device.location}</TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusText(device.status)}
                      color={getStatusColor(device.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{device.lastMaintenance}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(device)} color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(device.id)} color="error">
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
          {editingDevice ? 'Chỉnh sửa thiết bị' : 'Thêm thiết bị mới'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Mã thiết bị"
                  name="deviceId"
                  value={formData.deviceId}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tên thiết bị"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Loại thiết bị"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="gate">Cổng soát vé</option>
                  <option value="scanner">Máy quét thẻ</option>
                  <option value="camera">Camera</option>
                  <option value="display">Màn hình</option>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Vị trí"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Trạng thái"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="active">Hoạt động</option>
                  <option value="maintenance">Bảo trì</option>
                  <option value="inactive">Không hoạt động</option>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Bảo trì cuối"
                  name="lastMaintenance"
                  type="date"
                  value={formData.lastMaintenance}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Mô tả"
                  name="description"
                  multiline
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingDevice ? 'Cập nhật' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Devices; 