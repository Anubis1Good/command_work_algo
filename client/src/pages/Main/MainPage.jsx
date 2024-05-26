import React from 'react'
import styles from "./MainPage.module.css"


export default function () {
    return (
        <div className={styles.body}>
            <h1 className={styles.header}>Добро пожаловать!</h1>
            {/* <img className={styles.torpeda} src="торпеда.png" alt="" /> */}
            <div className={styles.chat}>
                <img className={styles.pictureChat} src="чат.PNG" alt="" />
                <p className={styles.text}>В нашей соц-сети есть чат, в котором вы можете общаться без проблем и перебоев. Будь таким же быстрым, как торпеда, в нашем чате.</p>
            </div>
            <img className={styles.grand} src="https://adindex.ru/files/292751/%D0%B4%D0%B5%D0%B42.png" alt="" />
        </div>
    )
}
