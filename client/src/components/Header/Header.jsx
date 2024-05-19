import { useContext, useState } from 'react';
import styles from './Header.module.css'
import {Nav} from "../Header/Nav/Nav";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from '../AuthProvider';

import { signout } from '../../utils/queries/signout';

export default function () {
    const [isAuthenticated, setIsAuthenticated] = useContext(AuthContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleSignOut = () => {
        setIsAuthenticated(false);
        signout();
        navigate('/');
    }

    const handleDropdownClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    return (
        <div className={styles.header}>
            <Nav/>
            <div className={styles.brand}>
                <img src="./logo.png" alt="logo" />
                <h1>Торпеда</h1>
            </div>
            {isAuthenticated ? (<>
                    <img src="./профиль.png" alt="avatar" className={styles.avatar} onClick={handleDropdownClick}/>
                    {isDropdownOpen && (
                        <div className={styles.dropdownContent}>
                            <div className={styles.dropdownItem} onClick={handleSignOut}>Выйти</div>
                        </div>
                    )}</>
            ) : null}
        </div>
    )
}


