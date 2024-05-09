import { createContext, useState, useEffect } from 'react';
import { getIsAuthenticated } from '../utils/queries/authenticated';
export const AuthContext = createContext();


export function AuthProvider ({ children }) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        getIsAuthenticated().then((response) => {
            setIsAuthenticated(response);
        });
    }, []);

    return (
        <AuthContext.Provider value={[isAuthenticated,setIsAuthenticated]}>
            {children}
        </AuthContext.Provider>
    );
};
