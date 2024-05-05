import { Link } from "react-router-dom";
import React, { useEffect, useRef, useState } from 'react'
import styles from "./Nav.module.css"

import Sidebar from "../Sidebar/Sidebar";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiHome, FiLogIn, FiUserPlus, FiInfo, FiHelpCircle} from "react-icons/fi";

export default function() {


    const [isOpen, setIsOpen] = useState(false)
    const toggleNav = () => {setIsOpen(!isOpen)
    }


    return (
        <>
        <Sidebar isOpen={isOpen} setOpen={setIsOpen} toggleNav={toggleNav}>
                <Link to="/"><FiHome/>Главная</Link>
                <Link to="/login"><FiLogIn/>Вход</Link> 
                <Link to="/register"><FiUserPlus/>Регистрация</Link>
                <Link to="/about"><FiInfo/>О проекте</Link>
                <Link to="/contacts"><FiHelpCircle/>Контакты</Link>

        </Sidebar>
        <button className={styles.burger} onClick={toggleNav}><RxHamburgerMenu/></button>

        </>

      );
}


