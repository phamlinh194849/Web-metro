import React, { useState } from 'react';
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
} from '@mui/material';
import { Add, Edit, Delete, Person } from '@mui/icons-material';

const UserManagement = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'user',
    status: 'active',
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [success, setSuccess] = useState('');

  // Mock data - replace with API call
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      phone: '0123456789',
      role: 'admin',
      status: 'active',
      avatar: null,
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'tranthib@example.com',
      phone: '0987654321',
      role: 'user',
      status: 'active',
      avatar: null,
    },
    {
      id: 3,
      name: 'Lê Văn C',
      email: 'levanc@example.com',
      phone: '0111222333',
      role: 'user',
      status: 'inactive',
      avatar: null,
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
    
    if (editingUser) {
      // Update existing user
      setUsers(users.map(user => 
        user.id === editingUser.id ? { ...formData, id: editingUser.id, avatar: editingUser.avatar } : user
      ));
      setSuccess('Cập nhật người dùng thành công!');
    } else {
      // Add new user
      const newUser = {
        ...formData,
        id: Date.now(),
        avatar: null,
      };
      setUsers([...users, newUser]);
      setSuccess('Thêm người dùng thành công!');
    }
    
    handleCloseDialog();
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'user',
      status: 'active',
    });
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData(user);
    setOpenDialog(true);
  };

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
    setSuccess('Xóa người dùng thành công!');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'user',
      status: 'active',
    });
  };

  const openNewDialog = () => {
    setOpenDialog(true);
    setEditingUser(null);
  };

  const getRoleColor = (role) => {
    return role === 'admin' ? 'error' : 'primary';
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'success' : 'default';
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

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Avatar>
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} />
                      ) : (
                        <Person />
                      )}
                    </Avatar>
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}
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
                  <TableCell>
                    <IconButton onClick={() => handleEdit(user)} color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(user.id)} color="error">
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
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
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
                >
                  <option value="user">Người dùng</option>
                  <option value="admin">Quản trị viên</option>
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
                >
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Không hoạt động</option>
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingUser ? 'Cập nhật' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement; 