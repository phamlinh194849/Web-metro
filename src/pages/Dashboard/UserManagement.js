import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
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
import { Add, Edit, Delete, Person } from '@mui/icons-material';

const UserManagement = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 2, // Default to user role
    status: 'active',
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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

  const openNewDialog = () => {
    setOpenDialog(true);
    setEditingUser(null);
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 1:
        return 'Admin';
      case 2:
        return 'User';
      case 3:
        return 'Staff';
      default:
        return 'Unknown';
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

  const getStatusColor = (status) => {
    return status === 'active' ? 'success' : 'default';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Quản lý người dùng
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={openNewDialog}
        >
          Thêm người dùng
        </Button>
      </Box>

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
                  <TableCell>Avatar</TableCell>
                  <TableCell>Tên</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Số điện thoại</TableCell>
                  <TableCell>Vai trò</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Ngày tạo</TableCell>
                  <TableCell>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Avatar>
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.full_name} />
                        ) : (
                          <Person />
                        )}
                      </Avatar>
                    </TableCell>
                    <TableCell>{user.full_name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone || 'N/A'}</TableCell>
                    <TableCell>
                      <Chip
                        label={getRoleLabel(user.role)}
                        color={getRoleColor(user.role)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                        color={getStatusColor(user.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{formatDate(user.created_at)}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(user)} color="primary" disabled={loading}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(user.id)} color="error" disabled={loading}>
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
          {editingUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tên"
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
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Vai trò"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  disabled={loading}
                >
                  <option value={1}>Admin</option>
                  <option value={2}>User</option>
                  <option value={3}>Staff</option>
                </TextField>
              </Grid>
              <Grid item xs={12}>
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
                  <option value="inactive">Không hoạt động</option>
                </TextField>
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
            {loading ? 'Đang xử lý...' : (editingUser ? 'Cập nhật' : 'Thêm')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement; 