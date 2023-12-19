import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedin, setLoggedin] = useState(false);
    const location = useLocation();
    const [currentSectionId, setCurrentSectionId] = useState('main');
    const [ user, setUser] = useState(null);

    // Atualiza quando o estado de login ou a rota muda
    useEffect(() => {
        const token = localStorage.getItem('token');
        setLoggedin(!!token);

        if (location.pathname === '/login' || location.pathname === '/cadastro') {
            setCurrentSectionId('main2'); 
        } else {
            setCurrentSectionId(isLoggedin ? 'main2' : 'main'); 
        }


    }, [location, isLoggedin]);

    const login = (token,) => {
        localStorage.setItem('token', token);
        setLoggedin(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setLoggedin(false);
    };

    // Forneça tanto o estado de login quanto as funções de login/logout e o ID da seção atual
    return (
        <AuthContext.Provider value={{ isLoggedin, login, logout, currentSectionId }}>
            {children}
        </AuthContext.Provider>
    );
};