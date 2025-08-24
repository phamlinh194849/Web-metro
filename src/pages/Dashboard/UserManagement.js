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
  Person, 
  Email, 
  Phone,
  AdminPanelSettings,
  Group,
  Support,
  Visibility,
  TrendingUp,
  People,
  Security
} from '@mui/icons-material';

const UserManagement = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 3, // Default to user role
    status: 'active',
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [fetching, setFetching] = useState(true);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setFetching(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Không tìm thấy token xác thực');
        return;
      }

      const response = await fetch('https://gometro-backend-production.up.railway.app/admin/users', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': token,
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setUsers(data.data);
      } else {
        setError(data.error || 'Lỗi khi tải danh sách người dùng');
      }
    } catch (err) {
      setError('Lỗi kết nối server');
      console.error('Error fetching users:', err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchUsers();
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
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Không tìm thấy token xác thực');
        return;
      }

      const requestData = {
        email: formData.email,
        full_name: formData.name,
        phone: formData.phone,
        role: parseInt(formData.role),
        status: formData.status,
      };

      let url = 'https://gometro-backend-production.up.railway.app/admin/users';
      let method = 'POST';

      if (editingUser) {
        url += `/${editingUser.id}`;
        method = 'PUT';
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(editingUser ? 'Cập nhật người dùng thành công!' : 'Thêm người dùng thành công!');
        handleCloseDialog();
        fetchUsers(); // Refresh the list
      } else {
        setError(data.error || 'Thao tác thất bại');
      }
    } catch (err) {
      setError('Lỗi kết nối server');
      console.error('Error submitting user:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.full_name,
      email: user.email,
      phone: user.phone || '',
      role: user.role.toString(),
      status: user.status,
    });
    setOpenDialog(true);
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Không tìm thấy token xác thực');
        return;
      }

      const response = await fetch(`https://gometro-backend-production.up.railway.app/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Authorization': token,
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess('Xóa người dùng thành công!');
        fetchUsers(); // Refresh the list
      } else {
        setError(data.error || 'Xóa người dùng thất bại');
      }
    } catch (err) {
      setError('Lỗi kết nối server');
      console.error('Error deleting user:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 2,
      status: 'active',
    });
  };

  const handleViewDetails = async (userId) => {
    try {
      setDetailLoading(true);
      setError('');
      
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Không tìm thấy token xác thực');
        return;
      }

      const response = await fetch(`https://gometro-backend-production.up.railway.app/admin/users/${userId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': token,
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSelectedUser(data.data);
        setOpenDetailDialog(true);
      } else {
        setError(data.error || 'Lỗi khi tải thông tin chi tiết người dùng');
      }
    } catch (err) {
      setError('Lỗi kết nối server');
      console.error('Error fetching user details:', err);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
    setSelectedUser(null);
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 1:
        return 'Quản trị viên';
      case 2:
        return 'Nhân viên';
      case 3:
        return 'Người dùng';
      default:
        return 'Không xác định';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 1:
        return 'error';
      case 2:
        return 'primary';
      case 3:
        return 'warning';
      default:
        return 'default';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 1:
        return <AdminPanelSettings />;
      case 2:
        return <Support />;
      case 3:
        return <Person />;
      default:
        return <Person />;
    }
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'success' : 'default';
  };

  const getStatusGradient = (status) => {
    switch (status) {
      case 'active': return 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)';
      case 'inactive': return 'linear-gradient(135deg, #f44336 0%, #ef5350 100%)';
      default: return 'linear-gradient(135deg, #9e9e9e 0%, #bdbdbd 100%)';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const activeUsers = users.filter(user => user.status === 'active').length;
  const adminUsers = users.filter(user => user.role === 1).length;
  const staffUsers = users.filter(user => user.role === 2).length;

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
                    Tổng người dùng
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    {users.length}
                  </Typography>
                </Box>
                <Tooltip title="Tổng số người dùng trong hệ thống" arrow>
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
                    {activeUsers}
                  </Typography>
                </Box>
                <Tooltip title="Số người dùng đang hoạt động trong hệ thống" arrow>
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
                    Quản trị viên
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    {adminUsers}
                  </Typography>
                </Box>
                <Tooltip title="Quản trị viên - Có quyền quản lý toàn bộ hệ thống" arrow>
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
                    <AdminPanelSettings sx={{ fontSize: 28 }} />
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
                    Nhân viên
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    {staffUsers}
                  </Typography>
                </Box>
                <Tooltip title="Nhân viên - Có quyền thực hiện các tác vụ được phân công" arrow>
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
                    <Support sx={{ fontSize: 28 }} />
                  </Avatar>
                </Tooltip>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* User List */}
      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 'bold', 
            mb: 2,
            color: '#1976d2'
          }}
        >
          Danh sách người dùng
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
          {users.map((user) => (
            <Card 
              key={user.id}
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
                  background: getStatusGradient(user.status),
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  {/* User Avatar */}
                  <Avatar sx={{ 
                    bgcolor: '#1976d2', 
                    width: 56, 
                    height: 56,
                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
                  }}>
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.full_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <Person sx={{ fontSize: 28 }} />
                    )}
                  </Avatar>

                  {/* User Info */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 'bold',
                          color: '#1976d2'
                        }}
                      >
                        {user.full_name}
                      </Typography>
                      <Tooltip title={`Trạng thái: ${user.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}`} arrow>
                        <Box sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          bgcolor: user.status === 'active' ? '#4caf50' : '#f44336',
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

                    {/* Contact Info */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Email sx={{ fontSize: 16, color: '#9c27b0' }} />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {user.email}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Phone Info - Separate line */}
                    {user.phone && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                        <Phone sx={{ fontSize: 16, color: '#ff9800' }} />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {user.phone}
                        </Typography>
                      </Box>
                    )}

                    {/* Additional Info */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        Ngày tạo: {formatDate(user.created_at)}
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                        ID: {user.id}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Actions */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
                    <Tooltip title={`Vai trò: ${getRoleLabel(user.role)}`} arrow>
                      <Avatar sx={{ 
                        width: 32, 
                        height: 32,
                        bgcolor: user.role === 1 ? '#f44336' : user.role === 2 ? '#1976d2' : '#ff9800',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.1)',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                        }
                      }}>
                        {getRoleIcon(user.role)}
                      </Avatar>
                    </Tooltip>
                    
                    <Tooltip title="Xem chi tiết">
                      <IconButton 
                        size="medium"
                        onClick={() => handleViewDetails(user.id)} 
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
                        onClick={() => handleEdit(user)}
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
                        onClick={() => handleDelete(user.id)}
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
          {editingUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
        </DialogTitle>
                 <DialogContent sx={{ mt: 2 }}>
           <Box component="form" onSubmit={handleSubmit}>
             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
               <TextField
                 fullWidth
                 label="Tên"
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
                 label="Email"
                 name="email"
                 type="email"
                 value={formData.email}
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
                 label="Số điện thoại"
                 name="phone"
                 value={formData.phone}
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
                 label="Vai trò"
                 name="role"
                 value={formData.role}
                 onChange={handleChange}
                 required
                 disabled={loading}
                 sx={{
                   '& .MuiOutlinedInput-root': {
                     borderRadius: 2,
                   }
                 }}
               >
                 <option value={1}>Quản trị viên</option>
                 <option value={2}>Nhân viên</option>
                 <option value={3}>Người dùng</option>
               </TextField>
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
                 <option value="inactive">Không hoạt động</option>
               </TextField>
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
            {loading ? 'Đang xử lý...' : (editingUser ? 'Cập nhật' : 'Thêm')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* User Detail Dialog - WOW Version */}
      <Dialog 
        open={openDetailDialog} 
        onClose={handleCloseDetailDialog} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            overflow: 'hidden',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7, #dda0dd, #98d8c8)',
              animation: 'rainbow 3s ease-in-out infinite'
            }
          }
        }}
      >
        <style>
          {`
            @keyframes rainbow {
              0%, 100% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
            }
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }
            @keyframes slideIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>
        
        <DialogTitle sx={{ 
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          color: 'white',
          borderBottom: '1px solid rgba(255,255,255,0.2)',
          p: 3
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                p: 1,
                mr: 2,
                animation: 'pulse 2s ease-in-out infinite'
              }}>
                <Person sx={{ fontSize: 28, color: 'white' }} />
              </Box>
              <Typography variant="h5" sx={{ 
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #fff, #f0f0f0)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}>
                Chi tiết người dùng
              </Typography>
            </Box>
            <Box sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'rgba(255,255,255,0.3)',
                transform: 'rotate(180deg)'
              }
            }} onClick={handleCloseDetailDialog}>
              <Typography sx={{ color: 'white', fontSize: 20 }}>×</Typography>
            </Box>
          </Box>
        </DialogTitle>
        
        <DialogContent sx={{ 
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(10px)',
          p: 0
        }}>
          {detailLoading ? (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center', 
              alignItems: 'center',
              p: 8,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}>
              <Box sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'pulse 1.5s ease-in-out infinite'
              }}>
                <CircularProgress size={60} sx={{ color: 'white' }} />
              </Box>
              <Typography sx={{ mt: 2, color: 'white', fontWeight: 'bold' }}>
                Đang tải thông tin...
              </Typography>
            </Box>
          ) : selectedUser ? (
            <Box sx={{ p: 4 }}>
              {/* Hero Section with Glassmorphism */}
              <Box sx={{
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                borderRadius: 4,
                p: 4,
                mb: 4,
                border: '1px solid rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: -50,
                  right: -50,
                  width: 100,
                  height: 100,
                  background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                  borderRadius: '50%',
                  animation: 'float 3s ease-in-out infinite'
                }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                  <Box sx={{
                    position: 'relative',
                    mr: 3,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: -5,
                      left: -5,
                      right: -5,
                      bottom: -5,
                      background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)',
                      borderRadius: '50%',
                      animation: 'rainbow 3s ease-in-out infinite',
                      zIndex: -1
                    }
                  }}>
                    <Avatar sx={{ 
                      width: 80, 
                      height: 80,
                      border: '4px solid white',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                      animation: 'pulse 2s ease-in-out infinite'
                    }}>
                      {selectedUser.avatar ? (
                        <img src={selectedUser.avatar} alt={selectedUser.full_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <Person sx={{ fontSize: 40 }} />
                      )}
                    </Avatar>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" sx={{ 
                      fontWeight: 'bold', 
                      background: 'linear-gradient(45deg, #667eea, #764ba2)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 1,
                      animation: 'slideIn 0.6s ease-out'
                    }}>
                      {selectedUser.full_name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        background: 'rgba(255,255,255,0.9)',
                        borderRadius: 20,
                        px: 2,
                        py: 0.5,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        animation: 'slideIn 0.8s ease-out'
                      }}>
                        <Avatar sx={{ 
                          width: 32, 
                          height: 32,
                          bgcolor: selectedUser.role === 1 ? '#f44336' : selectedUser.role === 2 ? '#1976d2' : '#ff9800',
                          mr: 1,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                        }}>
                          {getRoleIcon(selectedUser.role)}
                        </Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#333' }}>
                          {getRoleLabel(selectedUser.role)}
                        </Typography>
                      </Box>
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        background: selectedUser.status === 'active' 
                          ? 'linear-gradient(45deg, #4caf50, #66bb6a)' 
                          : 'linear-gradient(45deg, #f44336, #ef5350)',
                        borderRadius: 20,
                        px: 2,
                        py: 0.5,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        animation: 'slideIn 1s ease-out'
                      }}>
                        <Box sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          bgcolor: 'white',
                          mr: 1,
                          animation: 'pulse 2s ease-in-out infinite'
                        }} />
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'white' }}>
                          {selectedUser.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* User Details - Modern Cards */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Main Fields - Two Columns */}
                <Box sx={{ 
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 3,
                  alignItems: 'start'
                }}>
                  {/* Column 1 */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                    {[
                      { label: 'ID Người dùng', value: selectedUser.id, icon: '🔢' },
                      { label: 'Email', value: selectedUser.email, icon: '📧' },
                      { label: 'Vai trò', value: getRoleLabel(selectedUser.role), icon: '👤' }
                    ].map((field, index) => (
                      <Box key={field.label} sx={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                        borderRadius: 3,
                        p: 2.5,
                        border: '1px solid rgba(255,255,255,0.3)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                        transition: 'all 0.3s ease',
                        animation: `slideIn ${0.6 + index * 0.1}s ease-out`,
                        width: '100%',
                        minHeight: '120px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                          background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 100%)'
                        }
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography variant="subtitle2" sx={{ 
                            color: '#667eea', 
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            fontSize: '0.75rem',
                            letterSpacing: '0.5px'
                          }}>
                            {field.label}
                          </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ 
                          fontWeight: 600,
                          color: '#333',
                          fontSize: '1.1rem',
                          wordBreak: 'break-word'
                        }}>
                          {field.value}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  {/* Column 2 */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                    {[
                      { label: 'Số điện thoại', value: selectedUser.phone || 'Chưa cập nhật', icon: '📱' },
                      { label: 'Trạng thái', value: selectedUser.status === 'active' ? 'Hoạt động' : 'Không hoạt động', icon: '🟢' },
                      // Thêm một field rỗng để cân bằng chiều cao với cột 1
                      { label: '', value: '', icon: '', isEmpty: true }
                    ].map((field, index) => (
                      <Box key={field.label + index} sx={{
                        background: field.isEmpty ? 'transparent' : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                        borderRadius: 3,
                        p: field.isEmpty ? 0 : 2.5,
                        border: field.isEmpty ? 'none' : '1px solid rgba(255,255,255,0.3)',
                        backdropFilter: field.isEmpty ? 'none' : 'blur(10px)',
                        boxShadow: field.isEmpty ? 'none' : '0 8px 32px rgba(0,0,0,0.1)',
                        transition: 'all 0.3s ease',
                        animation: field.isEmpty ? 'none' : `slideIn ${0.8 + index * 0.1}s ease-out`,
                        width: '100%',
                        minHeight: field.isEmpty ? '120px' : '120px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        visibility: field.isEmpty ? 'hidden' : 'visible',
                        '&:hover': field.isEmpty ? {} : {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                          background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 100%)'
                        }
                      }}>
                        {!field.isEmpty && (
                          <>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <Typography variant="subtitle2" sx={{ 
                                color: '#667eea', 
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                fontSize: '0.75rem',
                                letterSpacing: '0.5px'
                              }}>
                                {field.label}
                              </Typography>
                            </Box>
                            <Typography variant="body1" sx={{ 
                              fontWeight: 600,
                              color: '#333',
                              fontSize: '1.1rem',
                              wordBreak: 'break-word'
                            }}>
                              {field.value}
                            </Typography>
                          </>
                        )}
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* Date Fields - Modern Timeline Style */}
                <Box sx={{
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
                  borderRadius: 4,
                  p: 3,
                  border: '1px solid rgba(102, 126, 234, 0.1)',
                  position: 'relative',
                  animation: 'slideIn 1.2s ease-out'
                }}>
                  <Typography variant="h6" sx={{ 
                    mb: 3, 
                    color: '#667eea',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    Lịch sử tài khoản
                  </Typography>
                  <Grid container spacing={3}>
                    {[
                      { label: 'Ngày tạo', value: formatDate(selectedUser.created_at), icon: '🎉' },
                      { label: 'Cập nhật lần cuối', value: formatDate(selectedUser.updated_at), icon: '🔄' }
                    ].map((field, index) => (
                      <Grid item xs={12} sm={6} key={field.label}>
                        <Box sx={{
                          display: 'flex',
                          alignItems: 'center',
                          background: 'rgba(255,255,255,0.8)',
                          borderRadius: 3,
                          p: 2,
                          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.02)',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                          }
                        }}>
                          <Box sx={{
                            background: 'linear-gradient(45deg, #667eea, #764ba2)',
                            borderRadius: '50%',
                            width: 50,
                            height: 50,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 2,
                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                          }}>
                            <Typography sx={{ fontSize: 24 }}>{field.icon}</Typography>
                          </Box>
                          <Box>
                            <Typography variant="subtitle2" sx={{ 
                              color: '#667eea', 
                              fontWeight: 'bold',
                              fontSize: '0.8rem',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px'
                            }}>
                              {field.label}
                            </Typography>
                            <Typography variant="body1" sx={{ 
                              fontWeight: 600,
                              color: '#333',
                              fontSize: '1rem'
                            }}>
                              {field.value}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                {/* Avatar - Premium Display */}
                {selectedUser.avatar && (
                  <Box sx={{
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                    borderRadius: 4,
                    p: 4,
                    textAlign: 'center',
                    border: '1px solid rgba(102, 126, 234, 0.2)',
                    animation: 'slideIn 1.4s ease-out'
                  }}>
                    <Typography variant="h6" sx={{ 
                      mb: 3, 
                      color: '#667eea',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      Ảnh đại diện
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'center',
                      position: 'relative'
                    }}>
                      <Box sx={{
                        position: 'relative',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: -10,
                          left: -10,
                          right: -10,
                          bottom: -10,
                          background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)',
                          borderRadius: '50%',
                          animation: 'rainbow 4s ease-in-out infinite',
                          zIndex: -1
                        }
                      }}>
                        <Avatar sx={{ 
                          width: 180, 
                          height: 180,
                          border: '6px solid white',
                          boxShadow: '0 16px 48px rgba(0,0,0,0.2)',
                          animation: 'pulse 3s ease-in-out infinite'
                        }}>
                          <img 
                            src={selectedUser.avatar} 
                            alt={selectedUser.full_name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </Avatar>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          ) : (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center', 
              alignItems: 'center',
              py: 8,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}>
              <Box sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2
              }}>
                <Typography sx={{ fontSize: 40 }}>😕</Typography>
              </Box>
              <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>
                Không tìm thấy thông tin người dùng
              </Typography>
            </Box>
          )}
        </DialogContent>
        
        <DialogActions sx={{ 
          p: 3, 
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(255,255,255,0.2)'
        }}>
          <Button 
            onClick={handleCloseDetailDialog}
            variant="contained"
            sx={{ 
              borderRadius: 3,
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              color: 'white',
              px: 4,
              py: 1.5,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(45deg, #5a6fd8, #6a5acd)',
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 32px rgba(102, 126, 234, 0.4)'
              }
            }}
          >
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement; 