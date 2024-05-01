import { Link } from "react-router-dom";
import React, { useEffect, useRef, useState } from 'react'
import styles from "./Nav.module.css"
import { useMediaQuery } from 'react-responsive'
import Sidebar from "../Sidebar/Sidebar";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiHome, FiLogIn, FiUserPlus, FiInfo, FiHelpCircle } from "react-icons/fi";

export default function() {
    const isMobile = useMediaQuery({ query: '(max-width: 1100px)' })

    const [isOpen, setIsOpen] = useState(false)
    const toggleNav = () => {setIsOpen(!isOpen)
    }


    return (
        isMobile ?
        <>
        <Sidebar isOpen={isOpen} toggleNav={toggleNav}>

            <div>
                <FiHome/><Link to="/">Главная </Link>
            </div>
            <div>
               <FiLogIn/><Link to="/login">Вход </Link> 
            </div>
            <div>
                <FiUserPlus/><Link to="/register">Регистрация </Link>
            </div>
            <div>
                <FiInfo/><Link to="/about">О проекте</Link>
            </div>
            <div>
                <FiHelpCircle/><Link to="/contacts">Контакты</Link>
            </div>
        </Sidebar>
        <button className={styles.burger} onClick={toggleNav}><RxHamburgerMenu/></button>
        </>
        :
        <div className={styles.links}>
        <Link to="/">Главная</Link>
        <Link to="/login">Вход</Link>
        <Link to="/register">Регистрация</Link>
        <Link to="/about">О проекте</Link>
        <Link to="/contacts">Контакты</Link>
        </div>

      );
}


