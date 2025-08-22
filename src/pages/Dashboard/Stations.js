import React, { useState, useEffect } from 'react';
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
  CircularProgress,
} from '@mui/material';
import { Add, Edit, Delete, LocationOn, Wifi } from '@mui/icons-material';

const Stations = () => {
  const [formData, setFormData] = useState({
    name: '',
    ip_address: '',
    address: '',
    status: 'active',
    capacity: '',
    description: '',
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [editingStation, setEditingStation] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [stations, setStations] = useState([]);
  const [fetching, setFetching] = useState(true);

  // Fetch stations from API
  const fetchStations = async () => {
    try {
      setFetching(true);
      const response = await fetch('https://gometro-backend-production.up.railway.app/station', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStations(data.data);
      } else {
        setError(data.error || 'Lỗi khi tải danh sách trạm');
      }
    } catch (err) {
      setError('Lỗi kết nối server');
      console.error('Error fetching stations:', err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const requestData = {
        name: formData.name,
        ip_address: formData.ip_address,
        address: formData.address,
        status: formData.status,
        capacity: parseInt(formData.capacity) || 0,
        description: formData.description,
      };

      let url = 'https://gometro-backend-production.up.railway.app/station';
      let method = 'POST';

      if (editingStation) {
        url += `/${editingStation.id}`;
        method = 'PUT';
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(editingStation ? 'Cập nhật trạm thành công!' : 'Thêm trạm thành công!');
        handleCloseDialog();
        fetchStations(); // Refresh the list
      } else {
        setError(data.error || 'Thao tác thất bại');
      }
    } catch (err) {
      setError('Lỗi kết nối server');
      console.error('Error submitting station:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (station) => {
    setEditingStation(station);
    setFormData({
      name: station.name,
      ip_address: station.ip_address,
      address: station.address || '',
      status: station.status || 'active',
      capacity: station.capacity.toString(),
      description: station.description || '',
    });
    setOpenDialog(true);
  };

  const handleDelete = async (stationId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa trạm này?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`https://gometro-backend-production.up.railway.app/station/${stationId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess('Xóa trạm thành công!');
        fetchStations(); // Refresh the list
      } else {
        setError(data.error || 'Xóa trạm thất bại');
      }
    } catch (err) {
      setError('Lỗi kết nối server');
      console.error('Error deleting station:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingStation(null);
    setFormData({
      name: '',
      ip_address: '',
      address: '',
      status: 'active',
      capacity: '',
      description: '',
    });
  };

  const getStatusColor = (status) => {
    if (!status || status === '') return 'default';
    switch (status) {
      case 'active': return 'success';
      case 'maintenance': return 'warning';
      case 'inactive': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    if (!status || status === '') return 'Chưa cập nhật';
    switch (status) {
      case 'active': return 'Hoạt động';
      case 'maintenance': return 'Bảo trì';
      case 'inactive': return 'Không hoạt động';
      default: return 'Không xác định';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const activeStations = stations.filter(station => station.status === 'active').length;
  const totalCapacity = stations.reduce((sum, station) => sum + (station.capacity || 0), 0);

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

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
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
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Wifi sx={{ fontSize: 40, color: '#9c27b0', mr: 2 }} />
                <Box>
                  <Typography variant="h6">Trạm có IP</Typography>
                  <Typography variant="h4">{stations.filter(s => s.ip_address).length}</Typography>
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
        {fetching ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Tên trạm</TableCell>
                  <TableCell>IP Address</TableCell>
                  <TableCell>Địa chỉ</TableCell>
                  <TableCell>Sức chứa</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Ngày tạo</TableCell>
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
                        {station.id}
                      </Box>
                    </TableCell>
                    <TableCell>{station.name}</TableCell>
                    <TableCell>
                      {station.ip_address ? (
                        <Chip
                          label={station.ip_address}
                          size="small"
                          icon={<Wifi />}
                          color="primary"
                          variant="outlined"
                        />
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          Chưa cập nhật
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>{station.address || 'Chưa cập nhật'}</TableCell>
                    <TableCell>{station.capacity ? station.capacity.toLocaleString() : '0'}</TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusText(station.status)}
                        color={getStatusColor(station.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{formatDate(station.created_at)}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(station)} color="primary" disabled={loading}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(station.id)} color="error" disabled={loading}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
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
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="IP Address"
                  name="ip_address"
                  value={formData.ip_address}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Địa chỉ"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={loading}>Hủy</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Đang xử lý...' : (editingStation ? 'Cập nhật' : 'Thêm')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Stations; 