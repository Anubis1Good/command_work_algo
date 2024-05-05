import { Link } from "react-router-dom";
import React, { useEffect, useRef, useState } from 'react'
import styles from "./Nav.module.css"
import { useMediaQuery } from 'react-responsive'
import Sidebar from "../Sidebar/Sidebar";

export default function() {
    const isMobile = useMediaQuery({ query: '(max-width: 880px)' })

    const [isOpen, setIsOpen] = useState(false)
    const toggleNav = () => {setIsOpen(!isOpen)
    }


    return (
        isMobile ?<>
                <button onClick={toggleNav}>Menu</button>
                <Sidebar isOpen={isOpen} onToggle={toggleNav}/></>
        :
            <div className={isMobile ? styles.linksMobile : styles.links}>
                <Link to="/">Главная</Link>
                <Link to="/login">Вход</Link>
                <Link to="/register">Регистрация</Link>
                <Link to="/about">О проекте</Link>
                <Link to="/contacts">Контакты</Link>
            </div>

      );
}


