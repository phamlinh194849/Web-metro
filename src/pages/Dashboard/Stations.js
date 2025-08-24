import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Chip,
  Avatar,
  CircularProgress,
  Fab,
  Tooltip,
} from '@mui/material';
import { 
  Add, 
  Edit, 
  Delete, 
  LocationOn, 
  Wifi, 
  Visibility,
  People,
  TrendingUp,
  AccessTime
} from '@mui/icons-material';

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
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [editingStation, setEditingStation] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
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

  const handleViewDetails = async (stationId) => {
    try {
      setDetailLoading(true);
      setError('');
      
      const response = await fetch(`https://gometro-backend-production.up.railway.app/station/${stationId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSelectedStation(data.data);
        setOpenDetailDialog(true);
      } else {
        setError(data.error || 'Lỗi khi tải thông tin chi tiết trạm');
      }
    } catch (err) {
      setError('Lỗi kết nối server');
      console.error('Error fetching station details:', err);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
    setSelectedStation(null);
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

  const getStatusGradient = (status) => {
    switch (status) {
      case 'active': return 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)';
      case 'maintenance': return 'linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)';
      case 'inactive': return 'linear-gradient(135deg, #f44336 0%, #ef5350 100%)';
      default: return 'linear-gradient(135deg, #9e9e9e 0%, #bdbdbd 100%)';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const activeStations = stations.filter(station => station.status === 'active').length;
  const totalCapacity = stations.reduce((sum, station) => sum + (station.capacity || 0), 0);

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      p: 3
    }}>
      {success && (
        <Alert 
          severity="success" 
          sx={{ 
            mb: 3, 
            borderRadius: 3,
            boxShadow: '0 4px 20px rgba(76, 175, 80, 0.15)'
          }} 
          onClose={() => setSuccess('')}
        >
          {success}
        </Alert>
      )}

      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: 3, 
            borderRadius: 3,
            boxShadow: '0 4px 20px rgba(244, 67, 54, 0.15)'
          }} 
          onClose={() => setError('')}
        >
          {error}
        </Alert>
      )}

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: 4,
            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 16px 48px rgba(102, 126, 234, 0.4)',
            }
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6" sx={{ opacity: 0.9, mb: 1 }}>
                    Tổng trạm
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    {stations.length}
                  </Typography>
                </Box>
                <Tooltip title="Tổng số trạm trong hệ thống" arrow>
                  <Avatar sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)', 
                    width: 56, 
                    height: 56,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      bgcolor: 'rgba(255,255,255,0.3)'
                    }
                  }}>
                    <LocationOn sx={{ fontSize: 28 }} />
                  </Avatar>
                </Tooltip>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{
            background: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)',
            color: 'white',
            borderRadius: 4,
            boxShadow: '0 8px 32px rgba(76, 175, 80, 0.3)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 16px 48px rgba(76, 175, 80, 0.4)',
            }
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6" sx={{ opacity: 0.9, mb: 1 }}>
                    Đang hoạt động
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    {activeStations}
                  </Typography>
                </Box>
                <Tooltip title="Số trạm đang hoạt động trong hệ thống" arrow>
                  <Avatar sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)', 
                    width: 56, 
                    height: 56,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      bgcolor: 'rgba(255,255,255,0.3)'
                    }
                  }}>
                    <TrendingUp sx={{ fontSize: 28 }} />
                  </Avatar>
                </Tooltip>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{
            background: 'linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)',
            color: 'white',
            borderRadius: 4,
            boxShadow: '0 8px 32px rgba(255, 152, 0, 0.3)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 16px 48px rgba(255, 152, 0, 0.4)',
            }
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6" sx={{ opacity: 0.9, mb: 1 }}>
                    Tổng sức chứa
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    {totalCapacity.toLocaleString()}
                  </Typography>
                </Box>
                <Tooltip title="Tổng sức chứa của tất cả các trạm" arrow>
                  <Avatar sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)', 
                    width: 56, 
                    height: 56,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      bgcolor: 'rgba(255,255,255,0.3)'
                    }
                  }}>
                    <People sx={{ fontSize: 28 }} />
                  </Avatar>
                </Tooltip>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{
            background: 'linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)',
            color: 'white',
            borderRadius: 4,
            boxShadow: '0 8px 32px rgba(156, 39, 176, 0.3)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 16px 48px rgba(156, 39, 176, 0.4)',
            }
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6" sx={{ opacity: 0.9, mb: 1 }}>
                    Trạm có IP
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    {stations.filter(s => s.ip_address).length}
                  </Typography>
                </Box>
                <Tooltip title="Số trạm có địa chỉ IP được cấu hình" arrow>
                  <Avatar sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)', 
                    width: 56, 
                    height: 56,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      bgcolor: 'rgba(255,255,255,0.3)'
                    }
                  }}>
                    <Wifi sx={{ fontSize: 28 }} />
                  </Avatar>
                </Tooltip>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Station List */}
      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 'bold', 
            mb: 2,
            color: '#1976d2'
          }}
        >
          Danh sách trạm
        </Typography>
      </Box>

      {fetching ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
          <CircularProgress size={60} />
        </Box>
      ) : (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 2 
        }}>
          {stations.map((station) => (
            <Card 
              key={station.id}
              sx={{
                borderRadius: 3,
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateX(8px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 4,
                  background: getStatusGradient(station.status),
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  {/* Station Avatar */}
                  <Avatar sx={{ 
                    bgcolor: '#1976d2', 
                    width: 56, 
                    height: 56,
                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
                  }}>
                    <LocationOn sx={{ fontSize: 28 }} />
                  </Avatar>

                  {/* Station Info */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 'bold',
                          color: '#1976d2',
                          flex: 1
                        }}
                      >
                        {station.name}
                      </Typography>
                      <Tooltip title={`Trạng thái: ${getStatusText(station.status)}`} arrow>
                        <Box sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          bgcolor: station.status === 'active' ? '#4caf50' : station.status === 'maintenance' ? '#ff9800' : '#f44336',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.2)',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
                          }
                        }} />
                      </Tooltip>
                    </Box>

                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ mb: 1 }}
                    >
                      {station.address || 'Chưa cập nhật địa chỉ'}
                    </Typography>

                    {/* Stats Row */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <People sx={{ fontSize: 16, color: '#ff9800' }} />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {station.capacity ? station.capacity.toLocaleString() : '0'} người
                        </Typography>
                      </Box>
                      
                      {station.ip_address && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Wifi sx={{ fontSize: 16, color: '#9c27b0' }} />
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {station.ip_address}
                          </Typography>
                        </Box>
                      )}

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AccessTime sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(station.created_at)}
                        </Typography>
                      </Box>

                      <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                        ID: {station.id}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Actions */}
                  <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
                    <Tooltip title="Xem chi tiết">
                      <IconButton 
                        size="medium"
                        onClick={() => handleViewDetails(station.id)} 
                        sx={{ 
                          bgcolor: '#e3f2fd',
                          '&:hover': { 
                            bgcolor: '#bbdefb',
                            transform: 'scale(1.1)'
                          },
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <Visibility sx={{ fontSize: 20, color: '#1976d2' }} />
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title="Chỉnh sửa">
                      <IconButton 
                        size="medium"
                        onClick={() => handleEdit(station)}
                        sx={{ 
                          bgcolor: '#fff3e0',
                          '&:hover': { 
                            bgcolor: '#ffe0b2',
                            transform: 'scale(1.1)'
                          },
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <Edit sx={{ fontSize: 20, color: '#ff9800' }} />
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title="Xóa">
                      <IconButton 
                        size="medium"
                        onClick={() => handleDelete(station.id)}
                        sx={{ 
                          bgcolor: '#ffebee',
                          '&:hover': { 
                            bgcolor: '#ffcdd2',
                            transform: 'scale(1.1)'
                          },
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <Delete sx={{ fontSize: 20, color: '#f44336' }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setOpenDialog(true)}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
          boxShadow: '0 8px 32px rgba(25, 118, 210, 0.3)',
          '&:hover': {
            background: 'linear-gradient(45deg, #1565c0, #1976d2)',
            transform: 'scale(1.1)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        <Add />
      </Fab>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle sx={{ 
          background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
          color: 'white',
          borderRadius: '8px 8px 0 0'
        }}>
          {editingStation ? 'Chỉnh sửa trạm' : 'Thêm trạm mới'}
        </DialogTitle>
                 <DialogContent sx={{ mt: 2 }}>
           <Box component="form" onSubmit={handleSubmit}>
             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
               <TextField
                 fullWidth
                 label="Tên trạm"
                 name="name"
                 value={formData.name}
                 onChange={handleChange}
                 required
                 disabled={loading}
                 sx={{
                   '& .MuiOutlinedInput-root': {
                     borderRadius: 2,
                   }
                 }}
               />
               <TextField
                 fullWidth
                 label="IP Address"
                 name="ip_address"
                 value={formData.ip_address}
                 onChange={handleChange}
                 required
                 disabled={loading}
                 sx={{
                   '& .MuiOutlinedInput-root': {
                     borderRadius: 2,
                   }
                 }}
               />
               <TextField
                 fullWidth
                 label="Địa chỉ"
                 name="address"
                 value={formData.address}
                 onChange={handleChange}
                 disabled={loading}
                 sx={{
                   '& .MuiOutlinedInput-root': {
                     borderRadius: 2,
                   }
                 }}
               />
               <TextField
                 fullWidth
                 label="Sức chứa"
                 name="capacity"
                 type="number"
                 value={formData.capacity}
                 onChange={handleChange}
                 disabled={loading}
                 sx={{
                   '& .MuiOutlinedInput-root': {
                     borderRadius: 2,
                   }
                 }}
               />
               <TextField
                 fullWidth
                 select
                 label="Trạng thái"
                 name="status"
                 value={formData.status}
                 onChange={handleChange}
                 required
                 disabled={loading}
                 sx={{
                   '& .MuiOutlinedInput-root': {
                     borderRadius: 2,
                   }
                 }}
               >
                 <option value="active">Hoạt động</option>
                 <option value="maintenance">Bảo trì</option>
                 <option value="inactive">Không hoạt động</option>
               </TextField>
               <TextField
                 fullWidth
                 label="Mô tả"
                 name="description"
                 multiline
                 rows={3}
                 value={formData.description}
                 onChange={handleChange}
                 disabled={loading}
                 sx={{
                   '& .MuiOutlinedInput-root': {
                     borderRadius: 2,
                   }
                 }}
               />
             </Box>
           </Box>
         </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={handleCloseDialog} 
            disabled={loading}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Hủy
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
            sx={{ 
              borderRadius: 2,
              background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1565c0, #1976d2)',
              }
            }}
          >
            {loading ? 'Đang xử lý...' : (editingStation ? 'Cập nhật' : 'Thêm')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Station Detail Dialog */}
      <Dialog open={openDetailDialog} onClose={handleCloseDetailDialog} maxWidth="md" fullWidth>
        <DialogTitle sx={{ 
          background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
          color: 'white',
          borderRadius: '8px 8px 0 0'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOn sx={{ mr: 1 }} />
            Chi tiết trạm
          </Box>
        </DialogTitle>
        <DialogContent>
          {detailLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress size={60} />
            </Box>
          ) : selectedStation ? (
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ mr: 2, bgcolor: '#1976d2', width: 56, height: 56 }}>
                      <LocationOn sx={{ fontSize: 28 }} />
                    </Avatar>
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                        {selectedStation.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                        <Tooltip title={`Trạng thái: ${getStatusText(selectedStation.status)}`} arrow>
                          <Box sx={{
                            width: 16,
                            height: 16,
                            borderRadius: '50%',
                            bgcolor: selectedStation.status === 'active' ? '#4caf50' : selectedStation.status === 'maintenance' ? '#ff9800' : '#f44336',
                            boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'scale(1.2)',
                              boxShadow: '0 5px 10px rgba(0,0,0,0.3)'
                            }
                          }} />
                        </Tooltip>
                        <Typography variant="body2" color="text.secondary">
                          {getStatusText(selectedStation.status)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    ID Trạm
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {selectedStation.id}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Địa chỉ IP
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {selectedStation.ip_address || 'Chưa cập nhật'}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Sức chứa
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {selectedStation.capacity ? selectedStation.capacity.toLocaleString() : '0'} người
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Ngày tạo
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {formatDate(selectedStation.created_at)}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Địa chỉ
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {selectedStation.address || 'Chưa cập nhật'}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Mô tả
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    fontWeight: 500,
                    backgroundColor: '#f5f5f5',
                    p: 2,
                    borderRadius: 1,
                    minHeight: 60,
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    {selectedStation.description || 'Chưa có mô tả'}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Cập nhật lần cuối
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {formatDate(selectedStation.updated_at)}
                  </Typography>
                </Grid>

                {selectedStation.image_url && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Hình ảnh
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: 2,
                      maxHeight: 300,
                      overflow: 'auto'
                    }}>
                      {selectedStation.image_url.split(';').map((imageUrl, index) => (
                        <Box
                          key={index}
                          sx={{
                            width: 200,
                            height: 150,
                            borderRadius: 2,
                            overflow: 'hidden',
                            border: '1px solid #e0e0e0',
                            flexShrink: 0,
                            '&:hover': {
                              transform: 'scale(1.05)',
                              transition: 'transform 0.3s ease',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                            }
                          }}
                        >
                          <img
                            src={imageUrl.trim()}
                            alt={`${selectedStation.name} - Ảnh ${index + 1}`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Box>
          ) : (
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
              Không tìm thấy thông tin trạm
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={handleCloseDetailDialog}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Stations; 