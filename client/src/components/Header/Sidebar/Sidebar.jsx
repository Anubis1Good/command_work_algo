import React from 'react'
import styles from './Sidebar.module.css'

export default function Sidebar({ isOpen, children }) {
    return (
        <div  className={isOpen ? `${styles.open}` : `${styles.closed}`}>
            {children}
        </div>
    )
}

