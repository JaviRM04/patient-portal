import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, MenuItem, Container, Snackbar, Typography, CircularProgress } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

function EditAppointmentForm() {
    const { id } = useParams();
    const [patients, setPatients] = useState([]);
    const [professionals, setProfessionals] = useState([]);
    const [receptionists, setReceptionists] = useState([]);
    const [appointment, setAppointment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const appointmentResponse = await axios.get(`https://p5r9b8qtui.execute-api.eu-central-1.amazonaws.com/appointments/${id}`);
                const patientsResponse = await axios.get('https://p5r9b8qtui.execute-api.eu-central-1.amazonaws.com/patients');
                const professionalsResponse = await axios.get('https://p5r9b8qtui.execute-api.eu-central-1.amazonaws.com/health-professionals');
                const receptionistsResponse = await axios.get('https://p5r9b8qtui.execute-api.eu-central-1.amazonaws.com/receptionists');

                setAppointment(appointmentResponse.data);
                setPatients(patientsResponse.data);
                setProfessionals(professionalsResponse.data);
                setReceptionists(receptionistsResponse.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setSnackbarMessage('Error fetching data');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAppointment({
            ...appointment,
            [name]: value
        });
    };

    const handleSave = () => {
        setLoading(true);
        axios.put(`https://p5r9b8qtui.execute-api.eu-central-1.amazonaws.com/appointments/${id}`, appointment)
            .then(response => {
                setSnackbarMessage('Cita actualizada con éxito');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                setLoading(false);
                navigate('/appointments');
            })
            .catch(err => {
                console.error('Error updating appointment:', err);
                setSnackbarMessage('Error actualizando la cita');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
                setLoading(false);
            });
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

    if (!appointment) {
        return <Typography variant="h6" color="error">No se encontraron detalles para la cita con ID {id}.</Typography>;
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Editar Cita</Typography>
            <TextField
                select
                label="Paciente"
                name="PacienteID"
                value={appointment.PacienteID}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            >
                {patients.map(patient => (
                    <MenuItem key={patient.PacienteID} value={patient.PacienteID}>
                        {patient.nombre} (ID: {patient.PacienteID})
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                select
                label="Profesional"
                name="ProfesionalID"
                value={appointment.ProfesionalID}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            >
                {professionals.map(professional => (
                    <MenuItem key={professional.ProfesionalID} value={professional.ProfesionalID}>
                        {professional.Especialidad} (ID: {professional.ProfesionalID})
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                select
                label="Recepcionista"
                name="RecepcionistaID"
                value={appointment.RecepcionistaID}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            >
                {receptionists.map(receptionist => (
                    <MenuItem key={receptionist.RecepcionistaID} value={receptionist.RecepcionistaID}>
                        {receptionist.Oficina} (ID: {receptionist.RecepcionistaID})
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                label="Fecha y Hora"
                name="FechaHora"
                type="datetime-local"
                value={appointment.FechaHora}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                label="Estado"
                name="Estado"
                value={appointment.Estado}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Notas"
                name="Notas"
                value={appointment.Notas}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: '10px' }}>
                Guardar
            </Button>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity} elevation={6} variant="filled">
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </Container>
    );
}

export default EditAppointmentForm;
