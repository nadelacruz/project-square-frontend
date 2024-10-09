import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './css/App.css'; // Transfered all css in their own modules
import './css/variables.css'
import './css/header-styles.css'
import './css/sidebar-styles.css'
import './css/feed-styles.css'
import './css/item-styles.css'
import './css/main-grid-styles.css'
import './css/landing-page-styles.css'
import './css/auth-page-styles.css'
import './css/location-page-styles.css'
import './css/groups-page-styles.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import AuthPage from './pages/auth/AuthPage';
import DashboardPage from './pages/DashboardPage';
import LandingPage from './pages/LandingPage';
import GroupsPage from './pages/GroupsPage';

import AuthenticatedRoute from './routes/AuthenticatedRoute';
import PublicRoute from './routes/PublicRoute';

import { AuthProvider } from './hooks/useAuth';
import { RecognizeProvider } from './hooks/useRecognize';
import { SidebarProvider } from './hooks/useSidebar';
import { GroupProvider } from './hooks/useGroup';

function App() {
  return (
    <Router>
      <AuthProvider>
      <RecognizeProvider>
      <GroupProvider>
      <SidebarProvider>
        <Routes>
          <Route index element={<PublicRoute><LandingPage /></PublicRoute>} />
          <Route path="auth/*" element={
            <PublicRoute>
              <Routes>
                <Route path="login" element={<AuthPage type={'login'}/>} />
                <Route path="register" element={<AuthPage type={'register'}/>} />
              </Routes>
            </PublicRoute>
          } />
          <Route path='/*' element={
            <AuthenticatedRoute>
              <Routes>
                <Route path='/dashboard' element={<DashboardPage />} />
                <Route path='/groups' element={<GroupsPage />} />
              </Routes>
            </AuthenticatedRoute>
          } />
        </Routes>
      </SidebarProvider>
      </GroupProvider>
      </RecognizeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
