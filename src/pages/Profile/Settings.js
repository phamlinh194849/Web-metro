import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from '@mui/material';
import {
  Notifications,
  Security,
  Language,
  Palette,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

const Settings = () => {
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      sms: true,
    },
    security: {
      twoFactor: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
    },
    appearance: {
      theme: 'light',
      language: 'vi',
      fontSize: 'medium',
    },
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSettingChange = (category, setting) => (event) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [setting]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
      },
    });
  };

  const handlePasswordChange = (field) => (event) => {
    setPasswordData({
      ...passwordData,
      [field]: event.target.value,
    });
  };

  const handleSaveSettings = () => {
    setSuccess('Cài đặt đã được lưu thành công!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setSuccess('Mật khẩu xác nhận không khớp!');
      return;
    }
    setSuccess('Mật khẩu đã được thay đổi thành công!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        Cài đặt
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Notifications Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Notifications sx={{ mr: 1, color: '#1976d2' }} />
                <Typography variant="h6">
                  Thông báo
                </Typography>
              </Box>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Email />
                  </ListItemIcon>
                  <ListItemText
                    primary="Thông báo qua email"
                    secondary="Nhận thông báo quan trọng qua email"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.notifications.email}
                      onChange={handleSettingChange('notifications', 'email')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Notifications />
                  </ListItemIcon>
                  <ListItemText
                    primary="Thông báo đẩy"
                    secondary="Nhận thông báo ngay lập tức"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.notifications.push}
                      onChange={handleSettingChange('notifications', 'push')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Email />
                  </ListItemIcon>
                  <ListItemText
                    primary="Thông báo SMS"
                    secondary="Nhận thông báo qua tin nhắn"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.notifications.sms}
                      onChange={handleSettingChange('notifications', 'sms')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Security Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Security sx={{ mr: 1, color: '#d32f2f' }} />
                <Typography variant="h6">
                  Bảo mật
                </Typography>
              </Box>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Lock />
                  </ListItemIcon>
                  <ListItemText
                    primary="Xác thực 2 yếu tố"
                    secondary="Bảo mật tài khoản với 2FA"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.security.twoFactor}
                      onChange={handleSettingChange('security', 'twoFactor')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Thời gian timeout phiên"
                    secondary="Tự động đăng xuất sau (phút)"
                  />
                  <FormControl sx={{ minWidth: 120 }}>
                    <Select
                      value={settings.security.sessionTimeout}
                      onChange={handleSettingChange('security', 'sessionTimeout')}
                      size="small"
                    >
                      <MenuItem value={15}>15 phút</MenuItem>
                      <MenuItem value={30}>30 phút</MenuItem>
                      <MenuItem value={60}>1 giờ</MenuItem>
                      <MenuItem value={120}>2 giờ</MenuItem>
                    </Select>
                  </FormControl>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Hết hạn mật khẩu"
                    secondary="Thay đổi mật khẩu sau (ngày)"
                  />
                  <FormControl sx={{ minWidth: 120 }}>
                    <Select
                      value={settings.security.passwordExpiry}
                      onChange={handleSettingChange('security', 'passwordExpiry')}
                      size="small"
                    >
                      <MenuItem value={30}>30 ngày</MenuItem>
                      <MenuItem value={60}>60 ngày</MenuItem>
                      <MenuItem value={90}>90 ngày</MenuItem>
                      <MenuItem value={180}>180 ngày</MenuItem>
                    </Select>
                  </FormControl>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Appearance Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Palette sx={{ mr: 1, color: '#7b1fa2' }} />
                <Typography variant="h6">
                  Giao diện
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Chủ đề</InputLabel>
                    <Select
                      value={settings.appearance.theme}
                      onChange={handleSettingChange('appearance', 'theme')}
                      label="Chủ đề"
                    >
                      <MenuItem value="light">Sáng</MenuItem>
                      <MenuItem value="dark">Tối</MenuItem>
                      <MenuItem value="auto">Tự động</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Ngôn ngữ</InputLabel>
                    <Select
                      value={settings.appearance.language}
                      onChange={handleSettingChange('appearance', 'language')}
                      label="Ngôn ngữ"
                    >
                      <MenuItem value="vi">Tiếng Việt</MenuItem>
                      <MenuItem value="en">English</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Cỡ chữ</InputLabel>
                    <Select
                      value={settings.appearance.fontSize}
                      onChange={handleSettingChange('appearance', 'fontSize')}
                      label="Cỡ chữ"
                    >
                      <MenuItem value="small">Nhỏ</MenuItem>
                      <MenuItem value="medium">Vừa</MenuItem>
                      <MenuItem value="large">Lớn</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Change Password */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Lock sx={{ mr: 1, color: '#388e3c' }} />
                <Typography variant="h6">
                  Đổi mật khẩu
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Mật khẩu hiện tại"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange('currentPassword')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Mật khẩu mới"
                    type={showPassword ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange('newPassword')}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Xác nhận mật khẩu mới"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange('confirmPassword')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleChangePassword}
                  >
                    Đổi mật khẩu
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleSaveSettings}
          sx={{ px: 4 }}
        >
          Lưu tất cả cài đặt
        </Button>
      </Box>
    </Box>
  );
};

export default Settings; 