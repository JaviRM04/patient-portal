// En src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import AppointmentsList from './pages/AppointmentsList';
import Profile from './pages/Profile';
import BloodTestList from './pages/BloodTestList';
import BloodTestReport from './pages/BloodTestReport';
import MedicalVisitsList from './pages/MedicalVisitsList';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/appointments" element={<AppointmentsList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/blood-tests" element={<BloodTestList />} />
          <Route path="/blood-test-report/:id" element={<BloodTestReport />} />
          <Route path="/medical-visits" element={<MedicalVisitsList />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
