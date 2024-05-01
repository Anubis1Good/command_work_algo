import React from 'react'
import styles from './Sidebar.module.css'
import ReactDOM from 'react-dom';
export default function Sidebar({ isOpen, children }) {
    return (
        <div className={isOpen ? styles.open : styles.closed}>
            {children}
        </div>
    )
}

