// En src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import PatientList from './pages/patients/PatientList';
import PatientProfile from './pages/patients/PatientProfile';
import UserProfile from './pages/users/UserProfile';
import UsersList from './pages/users/UserList';
import AppointmentsList from './pages/appointments/AppointmentsList';
import AppointmentForm from './pages/appointments/AppointmentForm';
import EditAppointmentForm from './pages/appointments/EditAppointmentForm';
import NewUserForm from './pages/users/NewUserForm';
import NewPatientForm from './pages/patients/NewPatientForm';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<PatientList />} />
          <Route path="/patient/:id" element={<PatientProfile />} />
          <Route path="/patients/new" element={<NewPatientForm />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/users/new" element={<NewUserForm />} /> 
          <Route path="/appointments" element={<AppointmentsList />} />
          <Route path="/appointments/new" element={<AppointmentForm />} />
          <Route path="/appointments/edit/:id" element={<EditAppointmentForm />} />
          
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
