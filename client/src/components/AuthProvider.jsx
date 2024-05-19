import { createContext, useState, useEffect } from 'react';
import { getIsAuthenticated } from '../utils/queries/authenticated';
import { getMyself } from '../utils/queries/authenticate';
export const AuthContext = createContext();


export function AuthProvider ({ children }) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user,setUser] = useState({});
    useEffect( () => {
        async function fetchData() {
            const isAuthenticated = await getIsAuthenticated();
            setIsAuthenticated(isAuthenticated);
            if (isAuthenticated) {
                const user = await getMyself();
                setUser(user);
            }
        }
        fetchData();
    },[]);

    return (
        <AuthContext.Provider value={[isAuthenticated,setIsAuthenticated,user,setUser]}>
            {children}
        </AuthContext.Provider>
    );
};
