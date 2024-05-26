import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, MenuItem, Container, Snackbar, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useUser } from '../../components/UserContext'; // Asegúrate de que la ruta sea correcta

function AppointmentForm() {
    const { userId } = useUser();  // Obtener el userId del contexto
    const [patients, setPatients] = useState([]);
    const [professionals, setProfessionals] = useState([]);
    const [receptionist, setReceptionist] = useState(null);
    const [appointment, setAppointment] = useState({
        PacienteID: '',
        RecepcionistaID: '',
        ProfesionalID: '',
        FechaHora: '',
        Estado: 'Pendiente',
        Notas: ''
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const patientsResponse = await axios.get('https://p5r9b8qtui.execute-api.eu-central-1.amazonaws.com/patients');
                const professionalsResponse = await axios.get('https://p5r9b8qtui.execute-api.eu-central-1.amazonaws.com/health-professionals');
                const receptionistsResponse = await axios.get('https://p5r9b8qtui.execute-api.eu-central-1.amazonaws.com/receptionists');
                
                const receptionist = receptionistsResponse.data.find(rec => rec.UserID === userId);
                setPatients(patientsResponse.data);
                setProfessionals(professionalsResponse.data);
                setReceptionist(receptionist);
                setAppointment(prev => ({
                    ...prev,
                    RecepcionistaID: receptionist?.RecepcionistaID || ''
                }));
            } catch (error) {
                console.error('Error fetching data:', error);
                setSnackbarMessage('Error fetching data');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        };

        fetchData();
    }, [userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAppointment({
            ...appointment,
            [name]: value
        });
    };

    const handleSave = () => {
        axios.post('https://p5r9b8qtui.execute-api.eu-central-1.amazonaws.com/appointments', appointment)
            .then(response => {
                setSnackbarMessage('Cita creada con éxito');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                navigate('/appointments');
            })
            .catch(err => {
                console.error('Error creating appointment:', err);
                setSnackbarMessage('Error creando la cita');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            });
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Crear Nueva Cita</Typography>
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
                label="Recepcionista"
                name="RecepcionistaID"
                value={receptionist ? receptionist.RecepcionistaID : 'Cargando...'}
                disabled
                fullWidth
                margin="normal"
            />
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

export default AppointmentForm;
