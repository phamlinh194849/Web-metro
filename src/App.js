import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Layout components
import Layout from './components/Layout/Layout';

// Auth pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Dashboard pages
import Home from './pages/Dashboard/Home';
import CardIssuance from './pages/Dashboard/CardIssuance';
import UserManagement from './pages/Dashboard/UserManagement';
import RFIDInventory from './pages/Dashboard/RFIDInventory';
import Stations from './pages/Dashboard/Stations';
import Schedules from './pages/Dashboard/Schedules';
import Devices from './pages/Dashboard/Devices';
import Reports from './pages/Dashboard/Reports';
import ActivityHistory from './pages/Dashboard/ActivityHistory';

// Profile pages
import Profile from './pages/Profile/Profile';
import Settings from './pages/Profile/Settings';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? children : <Navigate to="/login" replace />;
};

// Public Route component (redirect if already logged in)
const PublicRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? <Navigate to="/dashboard" replace /> : children;
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout user={user}>
                  <Home />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/card-issuance"
            element={
              <ProtectedRoute>
                <Layout user={user}>
                  <CardIssuance />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-management"
            element={
              <ProtectedRoute>
                <Layout user={user}>
                  <UserManagement />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/rfid-inventory"
            element={
              <ProtectedRoute>
                <Layout user={user}>
                  <RFIDInventory />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/stations"
            element={
              <ProtectedRoute>
                <Layout user={user}>
                  <Stations />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/schedules"
            element={
              <ProtectedRoute>
                <Layout user={user}>
                  <Schedules />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/devices"
            element={
              <ProtectedRoute>
                <Layout user={user}>
                  <Devices />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Layout user={user}>
                  <Reports />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/activity-history"
            element={
              <ProtectedRoute>
                <Layout user={user}>
                  <ActivityHistory />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Profile routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Layout user={user}>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Layout user={user}>
                  <Settings />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Default redirect */}
          <Route
            path="/"
            element={<Navigate to="/dashboard" replace />}
          />
          <Route
            path="*"
            element={<Navigate to="/dashboard" replace />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
