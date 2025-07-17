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
} from '@mui/material';
import { Add, Edit, Delete, Inventory } from '@mui/icons-material';

const RFIDInventory = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    type: 'standard',
    quantity: '',
    location: '',
    status: 'available',
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [success, setSuccess] = useState('');

  // Mock data
  const [inventory, setInventory] = useState([
    {
      id: 1,
      cardNumber: 'RFID001',
      type: 'standard',
      quantity: 100,
      location: 'Kho A',
      status: 'available',
    },
    {
      id: 2,
      cardNumber: 'RFID002',
      type: 'premium',
      quantity: 50,
      location: 'Kho B',
      status: 'low',
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
    
    if (editingCard) {
      setInventory(inventory.map(item => 
        item.id === editingCard.id ? { ...formData, id: editingCard.id } : item
      ));
      setSuccess('Cập nhật kho thành công!');
    } else {
      const newItem = {
        ...formData,
        id: Date.now(),
        quantity: parseInt(formData.quantity),
      };
      setInventory([...inventory, newItem]);
      setSuccess('Thêm vào kho thành công!');
    }
    
    handleCloseDialog();
    setFormData({
      cardNumber: '',
      type: 'standard',
      quantity: '',
      location: '',
      status: 'available',
    });
  };

  const handleEdit = (item) => {
    setEditingCard(item);
    setFormData(item);
    setOpenDialog(true);
  };

  const handleDelete = (itemId) => {
    setInventory(inventory.filter(item => item.id !== itemId));
    setSuccess('Xóa khỏi kho thành công!');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingCard(null);
    setFormData({
      cardNumber: '',
      type: 'standard',
      quantity: '',
      location: '',
      status: 'available',
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'success';
      case 'low': return 'warning';
      case 'out': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available': return 'Có sẵn';
      case 'low': return 'Sắp hết';
      case 'out': return 'Hết hàng';
      default: return 'Không xác định';
    }
  };

  const totalCards = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const availableCards = inventory.filter(item => item.status === 'available').reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        Quản lý kho thẻ RFID
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
                <Inventory sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
                <Box>
                  <Typography variant="h6">Tổng thẻ</Typography>
                  <Typography variant="h4">{totalCards}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Inventory sx={{ fontSize: 40, color: '#4caf50', mr: 2 }} />
                <Box>
                  <Typography variant="h6">Có sẵn</Typography>
                  <Typography variant="h4">{availableCards}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">
          Danh sách thẻ trong kho
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
        >
          Thêm thẻ mới
        </Button>
      </Box>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Số thẻ</TableCell>
                <TableCell>Loại</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Vị trí</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.cardNumber}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.type === 'standard' ? 'Thường' : 'Cao cấp'}
                      color={item.type === 'premium' ? 'primary' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusText(item.status)}
                      color={getStatusColor(item.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(item)} color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(item.id)} color="error">
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
          {editingCard ? 'Chỉnh sửa thẻ' : 'Thêm thẻ mới vào kho'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Số thẻ"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Loại thẻ"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="standard">Thường</option>
                  <option value="premium">Cao cấp</option>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Số lượng"
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
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
                  <option value="available">Có sẵn</option>
                  <option value="low">Sắp hết</option>
                  <option value="out">Hết hàng</option>
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingCard ? 'Cập nhật' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RFIDInventory;