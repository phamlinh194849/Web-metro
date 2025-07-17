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
import { Add, Edit, Delete, LocationOn } from '@mui/icons-material';

const Stations = () => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    address: '',
    status: 'active',
    capacity: '',
    description: '',
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [editingStation, setEditingStation] = useState(null);
  const [success, setSuccess] = useState('');

  // Mock data
  const [stations, setStations] = useState([
    {
      id: 1,
      name: 'Trạm Bến Thành',
      code: 'BT001',
      address: 'Quận 1, TP.HCM',
      status: 'active',
      capacity: 1000,
      description: 'Trạm trung tâm thành phố',
    },
    {
      id: 2,
      name: 'Trạm Chợ Lớn',
      code: 'CL002',
      address: 'Quận 5, TP.HCM',
      status: 'active',
      capacity: 800,
      description: 'Trạm khu vực Chợ Lớn',
    },
    {
      id: 3,
      name: 'Trạm Tân Bình',
      code: 'TB003',
      address: 'Quận Tân Bình, TP.HCM',
      status: 'maintenance',
      capacity: 600,
      description: 'Trạm đang bảo trì',
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
    
    if (editingStation) {
      setStations(stations.map(station => 
        station.id === editingStation.id ? { ...formData, id: editingStation.id } : station
      ));
      setSuccess('Cập nhật trạm thành công!');
    } else {
      const newStation = {
        ...formData,
        id: Date.now(),
        capacity: parseInt(formData.capacity),
      };
      setStations([...stations, newStation]);
      setSuccess('Thêm trạm thành công!');
    }
    
    handleCloseDialog();
    setFormData({
      name: '',
      code: '',
      address: '',
      status: 'active',
      capacity: '',
      description: '',
    });
  };

  const handleEdit = (station) => {
    setEditingStation(station);
    setFormData(station);
    setOpenDialog(true);
  };

  const handleDelete = (stationId) => {
    setStations(stations.filter(station => station.id !== stationId));
    setSuccess('Xóa trạm thành công!');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingStation(null);
    setFormData({
      name: '',
      code: '',
      address: '',
      status: 'active',
      capacity: '',
      description: '',
    });
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

  const activeStations = stations.filter(station => station.status === 'active').length;
  const totalCapacity = stations.reduce((sum, station) => sum + station.capacity, 0);

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        Danh sách trạm
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
                <LocationOn sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
                <Box>
                  <Typography variant="h6">Tổng trạm</Typography>
                  <Typography variant="h4">{stations.length}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOn sx={{ fontSize: 40, color: '#4caf50', mr: 2 }} />
                <Box>
                  <Typography variant="h6">Đang hoạt động</Typography>
                  <Typography variant="h4">{activeStations}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOn sx={{ fontSize: 40, color: '#ff9800', mr: 2 }} />
                <Box>
                  <Typography variant="h6">Tổng sức chứa</Typography>
                  <Typography variant="h4">{totalCapacity.toLocaleString()}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">
          Chi tiết các trạm
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
        >
          Thêm trạm mới
        </Button>
      </Box>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Mã trạm</TableCell>
                <TableCell>Tên trạm</TableCell>
                <TableCell>Địa chỉ</TableCell>
                <TableCell>Sức chứa</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Mô tả</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stations.map((station) => (
                <TableRow key={station.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ mr: 1, bgcolor: '#1976d2' }}>
                        <LocationOn />
                      </Avatar>
                      {station.code}
                    </Box>
                  </TableCell>
                  <TableCell>{station.name}</TableCell>
                  <TableCell>{station.address}</TableCell>
                  <TableCell>{station.capacity.toLocaleString()}</TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusText(station.status)}
                      color={getStatusColor(station.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{station.description}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(station)} color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(station.id)} color="error">
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
          {editingStation ? 'Chỉnh sửa trạm' : 'Thêm trạm mới'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tên trạm"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Mã trạm"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Địa chỉ"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Sức chứa"
                  name="capacity"
                  type="number"
                  value={formData.capacity}
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
            {editingStation ? 'Cập nhật' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Stations; 