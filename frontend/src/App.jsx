import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './components/HomePage';
import CoursePage from './components/CoursePage';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import RegisterPage from './components/RegisterPage';
import FacilitiesPage from './components/FacilitiesPage';
import Dashboard from './components/Dashboard';
import BookingsPage from './components/BookingsPage';
import IncidentsPage from './components/IncidentsPage';
import IncidentManagement from './components/IncidentManagement';
import AdminPage from './components/AdminPage';

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
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/facilities" element={<FacilitiesPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/incidents" element={<IncidentsPage />} />
            <Route path="/incident-management" element={<IncidentManagement />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
