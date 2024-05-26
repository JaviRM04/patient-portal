// src/components/PatientDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../components/UserContext';
import { Container, Typography, CircularProgress, Snackbar, Paper } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/system';

const DashboardPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
    backgroundColor: '#f5f5f5',
    boxShadow: theme.shadows[3],
    borderRadius: '8px',
}));

const DashboardContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

const WelcomeTypography = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
}));

const SubheadingTypography = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
}));

const BodyTypography = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

const PatientDashboard = () => {
    const { userId, userName } = useUser();
    const [loading, setLoading] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        const fetchData = async () => {
            try {
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
    }, [userId]);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    if (loading) {
        return (
            <DashboardContainer>
                <CircularProgress />
            </DashboardContainer>
        );
    }

    return (
        <DashboardContainer>
            <DashboardPaper>
                <WelcomeTypography variant="h2" gutterBottom>
                    Bienvenido, {userName}
                </WelcomeTypography>
                <SubheadingTypography variant="h5" gutterBottom>
                    Nos alegra verte de nuevo. Aquí puedes gestionar tu información personal, ver tus próximas citas, revisar tus análisis de sangre y tus visitas médicas.
                </SubheadingTypography>
                <BodyTypography variant="body1" gutterBottom>
                    Recuerda que cuidar de tu salud es lo más importante. Revisa regularmente tus análisis de sangre, mantén tus datos actualizados y no dudes en contactar a tu médico si tienes alguna duda o preocupación. Estamos aquí para ayudarte en cada paso del camino hacia una vida más saludable.
                </BodyTypography>
            </DashboardPaper>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity} elevation={6} variant="filled">
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </DashboardContainer>
    );
};

export default PatientDashboard;
