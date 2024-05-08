import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider ({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        fetch('/api/v1/authenticated')
            .then(res => res.json())
            .then(data => setIsAuthenticated(data.authenticated))
            .catch(err => {
                console.error(err);
                setIsAuthenticated(false);
            });
    }, []);

    return (
        <AuthContext.Provider value={[ isAuthenticated, setIsAuthenticated ]}>
            {children}
        </AuthContext.Provider>
    );
};
