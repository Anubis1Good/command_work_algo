import React, { useState } from 'react'
import styles from './Sidebar.module.css'

export default function Sidebar({ isOpen, onToggle }) {



    return (
        <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
            <div className={styles.overlay} onClick={onToggle}></div>
            <div className={styles.sidebarContent}>
                <h3>Sidebar content</h3>
            </div>
        </div>
    )
}
