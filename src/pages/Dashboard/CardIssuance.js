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
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

const CardIssuance = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    userId: '',
    userName: '',
    issueDate: '',
    expiryDate: '',
    status: 'active',
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [success, setSuccess] = useState('');

  // Mock data - replace with API call
  const [cards, setCards] = useState([
    {
      id: 1,
      cardNumber: 'RFID001',
      userId: 'U001',
      userName: 'Nguyễn Văn A',
      issueDate: '2024-01-15',
      expiryDate: '2025-01-15',
      status: 'active',
    },
    {
      id: 2,
      cardNumber: 'RFID002',
      userId: 'U002',
      userName: 'Trần Thị B',
      issueDate: '2024-01-16',
      expiryDate: '2025-01-16',
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
    
    if (editingCard) {
      // Update existing card
      setCards(cards.map(card => 
        card.id === editingCard.id ? { ...formData, id: editingCard.id } : card
      ));
      setSuccess('Cập nhật thẻ thành công!');
    } else {
      // Add new card
      const newCard = {
        ...formData,
        id: Date.now(),
      };
      setCards([...cards, newCard]);
      setSuccess('Cấp phát thẻ thành công!');
    }
    
    handleCloseDialog();
    setFormData({
      cardNumber: '',
      userId: '',
      userName: '',
      issueDate: '',
      expiryDate: '',
      status: 'active',
    });
  };

  const handleEdit = (card) => {
    setEditingCard(card);
    setFormData(card);
    setOpenDialog(true);
  };

  const handleDelete = (cardId) => {
    setCards(cards.filter(card => card.id !== cardId));
    setSuccess('Xóa thẻ thành công!');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingCard(null);
    setFormData({
      cardNumber: '',
      userId: '',
      userName: '',
      issueDate: '',
      expiryDate: '',
      status: 'active',
    });
  };

  const openNewDialog = () => {
    setOpenDialog(true);
    setEditingCard(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Cấp phát thẻ
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={openNewDialog}
        >
          Cấp phát thẻ mới
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
                <TableCell>Số thẻ</TableCell>
                <TableCell>ID người dùng</TableCell>
                <TableCell>Tên người dùng</TableCell>
                <TableCell>Ngày cấp</TableCell>
                <TableCell>Ngày hết hạn</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cards.map((card) => (
                <TableRow key={card.id}>
                  <TableCell>{card.cardNumber}</TableCell>
                  <TableCell>{card.userId}</TableCell>
                  <TableCell>{card.userName}</TableCell>
                  <TableCell>{card.issueDate}</TableCell>
                  <TableCell>{card.expiryDate}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        backgroundColor: card.status === 'active' ? '#4caf50' : '#f44336',
                        color: 'white',
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: '0.875rem',
                      }}
                    >
                      {card.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(card)} color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(card.id)} color="error">
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
          {editingCard ? 'Chỉnh sửa thẻ' : 'Cấp phát thẻ mới'}
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
                  label="ID người dùng"
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tên người dùng"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Ngày cấp"
                  name="issueDate"
                  type="date"
                  value={formData.issueDate}
                  onChange={handleChange}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Ngày hết hạn"
                  name="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingCard ? 'Cập nhật' : 'Cấp phát'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CardIssuance; 