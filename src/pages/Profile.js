// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../components/UserContext';
import { Card, CardContent, Typography, CircularProgress, Container, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Profile = () => {
    const { userId } = useUser();  // Obtener el userId del contexto
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const response = await axios.get(`https://p5r9b8qtui.execute-api.eu-central-1.amazonaws.com/patients/${userId}`);
                setPatient(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching patient details:', err);
                setError('Error fetching patient details');
                setLoading(false);
                setSnackbarMessage('Error fetching patient details');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        };

        fetchPatientData();
    }, [userId]);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    if (loading) {
        return (
            <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return <Typography variant="h6" color="error">{error}</Typography>;
    }

    return (
        <Container>
            <Card raised>
                <CardContent>
                    <Typography variant="h4" gutterBottom>Perfil del Paciente</Typography>
                    {patient ? (
                        <>
                            <Typography variant="h6">DNI: {patient.DNI}</Typography>
                            <Typography color="textSecondary">Fecha de Nacimiento: {patient.FechaNacimiento}</Typography>
                            <Typography color="textSecondary">Género: {patient.Genero}</Typography>
                            <Typography color="textSecondary">Dirección: {patient.Direccion}</Typography>
                            <Typography color="textSecondary">Número de Seguridad Social: {patient.NumeroSeguridadSocial}</Typography>
                            <Typography color="textSecondary">Grupo Sanguíneo: {patient.GrupoSanguineo}</Typography>
                            <Typography color="textSecondary">Alergias: {patient.Alergias}</Typography>
                            <Typography color="textSecondary">Antecedentes Personales: {patient.AntecedentesPersonales}</Typography>
                            <Typography color="textSecondary">Antecedentes Familiares: {patient.AntecedentesFamiliares}</Typography>
                            <Typography color="textSecondary">Notas Médicas: {patient.NotasMedicas}</Typography>
                        </>
                    ) : (
                        <Typography color="textSecondary">No se encontraron detalles para el paciente con ID {userId}.</Typography>
                    )}
                </CardContent>
            </Card>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity} elevation={6} variant="filled">
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </Container>
    );
};

export default Profile;
