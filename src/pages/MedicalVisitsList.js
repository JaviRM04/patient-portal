import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../components/UserContext';
import { Container, Typography, CircularProgress, List, ListItem, Card, CardContent, Divider, Snackbar, Box } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const MedicalVisitsList = () => {
    const { userId } = useUser();  // Obtener el userId del contexto
    const [medicalVisits, setMedicalVisits] = useState([]);
    const [professionals, setProfessionals] = useState([]);
    const [users, setUsers] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const visitsResponse = await axios.get('https://p5r9b8qtui.execute-api.eu-central-1.amazonaws.com/medical-visits');
                const professionalsResponse = await axios.get('https://p5r9b8qtui.execute-api.eu-central-1.amazonaws.com/health-professionals');
                const usersResponse = await axios.get('https://p5r9b8qtui.execute-api.eu-central-1.amazonaws.com/users');
                const prescriptionsResponse = await axios.get('https://p5r9b8qtui.execute-api.eu-central-1.amazonaws.com/prescriptions');
                
                const patientVisits = visitsResponse.data.filter(visit => visit.PacienteID === parseInt(userId));
                setMedicalVisits(patientVisits);
                setProfessionals(professionalsResponse.data);
                setUsers(usersResponse.data);
                setPrescriptions(prescriptionsResponse.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Error fetching data');
                setLoading(false);
                setSnackbarMessage('Error fetching data');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        };

        fetchData();
    }, [userId]);

    const getProfessionalName = (professionalId) => {
        const professional = professionals.find(prof => prof.ProfesionalID === professionalId);
        if (professional) {
            const user = users.find(user => user.UserID === professional.UserID);
            return user ? user.Nombre : 'Desconocido';
        }
        return 'Desconocido';
    };

    const getPrescriptionsForVisit = (visitId) => {
        return prescriptions.filter(prescription => prescription.VisitaID === visitId);
    };

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
                Lista de Visitas Médicas
            </Typography>
            <List>
                {medicalVisits.map((visit) => (
                    <ListItem key={visit.VisitaID} alignItems="flex-start">
                        <Card variant="outlined" style={{ width: '100%' }}>
                            <CardContent>
                                <Typography variant="h6">Visita Médica ID: {visit.VisitaID}</Typography>
                                <Divider style={{ margin: '10px 0' }} />
                                <Typography variant="body2">Fecha y Hora: {visit.FechaHora}</Typography>
                                <Typography variant="body2">Motivo de la Consulta: {visit.MotivoConsulta}</Typography>
                                <Typography variant="body2">Diagnóstico: {visit.Diagnostico}</Typography>
                                <Typography variant="body2">Duración: {visit.Duracion}</Typography>
                                <Typography variant="body2">Notas: {visit.Notas}</Typography>
                                <Typography variant="body2">Médico: {getProfessionalName(visit.ProfesionalID)}</Typography>
                                <Box mt={2}>
                                    <Typography variant="h6" gutterBottom>Prescripciones:</Typography>
                                    {getPrescriptionsForVisit(visit.VisitaID).map((prescription) => (
                                        <Box key={prescription.PrescripcionID} mb={2} p={2} border={1} borderRadius={8} borderColor="grey.400">
                                            <Typography variant="body2"><strong>Medicamento:</strong> {prescription.Medicamento}</Typography>
                                            <Typography variant="body2"><strong>Dosis:</strong> {prescription.Dosis}</Typography>
                                            <Typography variant="body2"><strong>Instrucciones:</strong> {prescription.Instrucciones}</Typography>
                                            <Typography variant="body2"><strong>Fecha de Prescripción:</strong> {prescription.FechaPrescripcion}</Typography>
                                            <Typography variant="body2"><strong>Fecha de Expiración:</strong> {prescription.FechaExpiracion}</Typography>
                                            <Typography variant="body2"><strong>Estado:</strong> {prescription.Estado}</Typography>
                                        </Box>
                                    ))}
                                </Box>
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

export default MedicalVisitsList;
