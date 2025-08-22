# Metro Management System

Hệ thống quản lý Metro với giao diện web hiện đại, được xây dựng bằng React và Material-UI.

## Tính năng chính

### 🔐 Xác thực
- Đăng nhập/Đăng ký người dùng
- Bảo vệ route với authentication
- Quản lý session

### 📊 Dashboard
- **Trang chủ**: Thống kê tổng quan với các chỉ số quan trọng
- **Cấp phát thẻ**: Quản lý việc cấp phát thẻ RFID cho người dùng
- **Quản lý người dùng**: CRUD người dùng hệ thống
- **Quản lý kho thẻ RFID**: Theo dõi tồn kho thẻ
- **Danh sách trạm**: Quản lý các trạm metro
- **Lịch trình**: Quản lý lịch trình chạy tàu
- **Danh sách thiết bị**: Quản lý thiết bị tại các trạm
- **Báo cáo thống kê**: Báo cáo và biểu đồ thống kê
- **Lịch sử hoạt động**: Theo dõi hoạt động người dùng

### 👤 Quản lý cá nhân
- **Thông tin cá nhân**: Xem và chỉnh sửa thông tin
- **Cài đặt**: Tùy chỉnh hệ thống, thông báo, bảo mật

## Công nghệ sử dụng

- **React 19.1.0**: Framework chính
- **Material-UI (MUI)**: UI components
- **React Router**: Routing và navigation
- **Emotion**: CSS-in-JS styling

## Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js (version 14 trở lên)
- npm hoặc yarn

### Cài đặt dependencies

#### Trên Windows PowerShell
Nếu gặp lỗi "cannot be loaded because running scripts is disabled", chạy lệnh sau trước:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### Cài đặt packages
```bash
npm install
```

**Lưu ý:** Nếu gặp lỗi `'react-scripts' is not recognized`, chạy:
```bash
npm install react-scripts
```

### Chạy ứng dụng
```bash
npm start
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

### Build cho production
```bash
npm run build
```

## Cấu trúc thư mục

```
src/
├── components/
│   └── Layout/
│       ├── Header.js          # Header với avatar và menu
│       ├── Sidebar.js         # Navigation sidebar
│       └── Layout.js          # Layout chính
├── pages/
│   ├── Auth/
│   │   ├── Login.js           # Trang đăng nhập
│   │   └── Register.js        # Trang đăng ký
│   ├── Dashboard/
│   │   ├── Home.js            # Trang chủ
│   │   ├── CardIssuance.js    # Cấp phát thẻ
│   │   ├── UserManagement.js  # Quản lý người dùng
│   │   ├── RFIDInventory.js   # Quản lý kho thẻ
│   │   ├── Stations.js        # Danh sách trạm
│   │   ├── Schedules.js       # Lịch trình
│   │   ├── Devices.js         # Danh sách thiết bị
│   │   ├── Reports.js         # Báo cáo thống kê
│   │   └── ActivityHistory.js # Lịch sử hoạt động
│   └── Profile/
│       ├── Profile.js         # Thông tin cá nhân
│       └── Settings.js        # Cài đặt
├── App.js                     # Component chính với routing
└── index.js                   # Entry point
```

## Tính năng chi tiết

### 🔐 Authentication
- Form đăng nhập với validation
- Form đăng ký với validation đầy đủ
- Protected routes tự động redirect
- Session management với localStorage

### 📊 Dashboard Features
- **Responsive design**: Tương thích mobile và desktop
- **Real-time stats**: Thống kê số liệu thời gian thực
- **Data tables**: Bảng dữ liệu với sorting và filtering
- **CRUD operations**: Thêm, sửa, xóa dữ liệu
- **Search & Filter**: Tìm kiếm và lọc dữ liệu

### 🎨 UI/UX
- **Material Design**: Giao diện hiện đại theo Material Design
- **Dark/Light theme**: Hỗ trợ chủ đề sáng/tối
- **Responsive**: Tương thích mọi thiết bị
- **Accessibility**: Hỗ trợ accessibility standards

## API Integration

Hiện tại ứng dụng sử dụng mock data. Để tích hợp với API thực tế:

1. Tạo file `src/services/api.js` để quản lý API calls
2. Thay thế mock data trong các components
3. Thêm error handling và loading states
4. Implement proper authentication với JWT tokens

## Deployment

### Build
```bash
npm run build
```

### Deploy to static hosting
- Netlify
- Vercel
- GitHub Pages
- AWS S3

## Contributing

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## License

MIT License

## Support

Nếu có vấn đề hoặc câu hỏi, vui lòng tạo issue trên GitHub repository.
