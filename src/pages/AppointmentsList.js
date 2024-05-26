// src/components/AppointmentsList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../components/UserContext';
import { List, ListItem, Card, CardContent, Typography, Divider, Button, Container, CircularProgress, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const AppointmentsList = () => {
    const { userId } = useUser();  // Obtener el userId del contexto
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get(`https://p5r9b8qtui.execute-api.eu-central-1.amazonaws.com/appointments?patientId=${userId}`);
                setAppointments(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching appointments:', err);
                setError('Error fetching appointments');
                setLoading(false);
                setSnackbarMessage('Error fetching appointments');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        };

        fetchAppointments();
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
            <Typography variant="h4" gutterBottom>
                Lista de Citas
            </Typography>
            <List>
                {appointments.map((appointment) => (
                    <ListItem key={appointment.CitaID} alignItems="flex-start">
                        <Card variant="outlined" style={{ width: '100%' }}>
                            <CardContent>
                                <Typography variant="h6">Cita ID: {appointment.CitaID}</Typography>
                                <Divider style={{ margin: '10px 0' }} />
                                <Typography variant="body2">Fecha y Hora: {appointment.FechaHora}</Typography>
                                <Typography variant="body2">Estado: {appointment.Estado}</Typography>
                                <Typography variant="body2">Notas: {appointment.Notas}</Typography>
                            </CardContent>
                        </Card>
                    </ListItem>
                ))}
            </List>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity} elevation={6} variant="filled">
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </Container>
    );
};

export default AppointmentsList;
