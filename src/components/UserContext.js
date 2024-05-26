import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ userId: 5, userName: '', gender: '' });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`https://p5r9b8qtui.execute-api.eu-central-1.amazonaws.com/users/${user.userId}`);
                setUser(prevUser => ({ 
                    ...prevUser, 
                    userName: response.data.Nombre,
                    gender: response.data.Genero 
                }));
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUser();
    }, [user.userId]);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
