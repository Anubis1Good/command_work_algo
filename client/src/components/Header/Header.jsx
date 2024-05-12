import { useContext } from 'react';
import styles from './Header.module.css'
import {Nav} from "../Header/Nav/Nav";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from '../AuthProvider';

import { signout } from '../../utils/queries/signout';
export default function (){
    const [isAuthenticated, setIsAuthenticated] = useContext(AuthContext);

    const navigate = useNavigate();
    const handleSignOut = () => {
        setIsAuthenticated(false);
        signout();
        navigate('/');
    }
    
    return (
        <div className={styles.header}>
            <Nav/>
            <div className={styles.brand}>
                <img src="./logo.png" alt="logo" />
                <h1>Торпеда</h1>
            </div>
            {isAuthenticated ? (
                <div className={styles.profile}>
                    <div className={styles.signOut} onClick={handleSignOut}>Выйти</div>
                    <Link to="/profile" className={styles.avatar}>
                        <img src="./профиль.png" alt="avatar" />
                    </Link>
                </div>
            ) : null}
        </div>
    )
}
