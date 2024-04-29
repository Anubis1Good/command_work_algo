import styles from './Header.module.css'
import { Link } from "react-router-dom";
export default function (){
    return (
        <div className={styles.header}>
            <div className={styles.brand}>
                <img src="./logo.png" alt="logo" width={50} height={50} />
                <h1>Торпеда</h1>
            </div>
            <div className={styles.links}>
                <Link to="/">Главная</Link>
                <Link to="/login">Вход</Link>
                <Link to="/register">Регистрация</Link>
                <Link to="/about">О проекте</Link>
                <Link to="/contacts">Контакты</Link>
            </div>
        </div>
    )
}
