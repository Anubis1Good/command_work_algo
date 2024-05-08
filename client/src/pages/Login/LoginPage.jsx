
import styles from "./LoginPage.module.css"
import Header from "../../components/Header/Header"
import BodyForm from "../../components/BodyForm/BodyForm"

import { Link } from "react-router-dom";
export default function () {


    return (
        <>
        <Header/>
        <BodyForm className={styles.form} resource="/api/v1/login"  >
            <label htmlFor="username"> Имя пользователя</label>
            <input type="text" name="username" id="username" />

            <label htmlFor="password"> Пароль</label>
            <input type="password" name="password" id="password" />

            <button type="submit">Вход</button>
        </BodyForm>
        <p>Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>
        </>
    )
}