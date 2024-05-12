import { Link } from "react-router-dom";
import React, { useContext, useState } from 'react'
import styles from "./Nav.module.css"

import Sidebar from "../Sidebar/Sidebar";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiHome, FiLogIn, FiUserPlus, FiInfo, FiHelpCircle} from "react-icons/fi";
import { CiChat1 } from "react-icons/ci";

import {AuthContext} from '../../AuthProvider';

export function Nav() {

    const [isOpen, setIsOpen] = useState(false)
    const toggleNav = () => {setIsOpen(!isOpen)}

    const [isAuthenticated, setIsAuthenticated] = useContext(AuthContext);
    return (
        <>
        <Sidebar isOpen={isOpen} setOpen={setIsOpen}>
                <Link to="/"><FiHome/>Главная</Link>

                {!isAuthenticated ?
                  <>
                    <Link to="/login"><FiLogIn/>Вход</Link> 
                    <Link to="/register"><FiUserPlus/>Регистрация</Link>
                  </> 
                  : 
                  <>
                    <Link to="/chat"><CiChat1/>Чат</Link>
                  </>
                  }

                <Link to="/about"><FiInfo/>О проекте</Link>
                <Link to="/contacts"><FiHelpCircle/>Контакты</Link>

        </Sidebar>
        <button className={styles.burger} onClick={toggleNav}><RxHamburgerMenu/></button>
        </>

      );
}


