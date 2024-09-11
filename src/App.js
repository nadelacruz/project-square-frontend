import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import DashboardPage from './pages/DashboardPage';
import LandingPage from './pages/LandingPage';

import AuthenticatedRoute from './routes/AuthenticatedRoute';
import PublicRoute from './routes/PublicRoute';

import { AuthProvider } from './hooks/useAuth';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route index element={<PublicRoute><LandingPage /></PublicRoute>} />
          <Route path="auth/*" element={
            <PublicRoute>
              <Routes>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Routes>
            </PublicRoute>
          } />
          <Route path='dashboard/*' element={
            <AuthenticatedRoute>
              <Routes>
                <Route path='/' element={<DashboardPage />} />
              </Routes>
            </AuthenticatedRoute>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
