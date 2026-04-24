import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './components/HomePage';
import CoursePage from './components/CoursePage';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import FacilitiesPage from './components/FacilitiesPage';
import UserFacilities from './components/UserFacilities';
import Dashboard from './components/Dashboard';
import BookingsPage from './components/BookingsPage';
import BookingForm from './components/BookingForm';
import IncidentsPage from './components/IncidentsPage';
import IncidentManagement from './components/IncidentManagement';
import AdminPage from './components/AdminPage';
import StudentProfile from './components/StudentProfile';
import ProtectedRoute from './components/common/ProtectedRoute';
import OAuth2RedirectHandler from './components/auth/OAuth2RedirectHandler';

function App() {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/facilities" element={<UserFacilities />} />
            <Route path="/facilities-dashboard" element={<FacilitiesPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/book" element={<BookingForm />} />
            <Route path="/incidents" element={<IncidentsPage />} />
            <Route path="/incident-management" element={<IncidentManagement />} />
            <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminPage />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <StudentProfile />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
