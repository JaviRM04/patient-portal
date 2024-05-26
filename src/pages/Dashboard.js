import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, CircularProgress, Paper, Box } from '@mui/material';
import { useUser } from '../components/UserContext';  // Asegúrate de que la ruta sea correcta

const Dashboard = () => {
    const { userName, gender } = useUser();  // Obtener el nombre y género del usuario del contexto
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Aquí podrías hacer llamadas a la API si necesitas datos adicionales
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const saludo = gender === 'Masculino' ? 'Bienvenido' : 'Bienvenida';

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
            <Paper elevation={3} style={{ padding: '30px', marginTop: '20px' }}>
                <Typography variant="h2" gutterBottom>
                    {saludo}, {userName}
                </Typography>
                <Box mt={4} mb={4}>
                    <Typography variant="h5" gutterBottom style={{ color: '#4caf50' }}>
                        Gestión Integral para Recepcionistas
                    </Typography>
                    <Typography variant="body1" gutterBottom style={{ marginBottom: '20px' }}>
                        Aquí puedes gestionar las citas, pacientes y profesionales de salud. Utiliza el menú de navegación para acceder a las diferentes secciones del portal.
                    </Typography>
                </Box>
                <Box mt={4} mb={4} style={{ backgroundColor: '#e3f2fd', padding: '20px', borderRadius: '8px' }}>
                    <Typography variant="h6" gutterBottom>
                        Tu Rol es Crucial
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Como recepcionista, tu rol es crucial para asegurar que todos los procesos administrativos se lleven a cabo de manera eficiente. Gracias por tu dedicación y esfuerzo.
                    </Typography>
                </Box>
                <Box mt={4} mb={4} style={{ backgroundColor: '#fff3e0', padding: '20px', borderRadius: '8px' }}>
                    <Typography variant="h6" gutterBottom>
                        Recordatorio
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Recuerda revisar las citas programadas y asegurarte de que la información de los pacientes esté actualizada. Si tienes alguna pregunta, no dudes en contactar con el administrador del sistema.
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default Dashboard;
