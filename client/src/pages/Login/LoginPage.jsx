
import styles from "./LoginPage.module.css"
import Header from "../../components/Header/Header"
import BodyForm from "../../components/BodyForm/BodyForm"

import { Link } from "react-router-dom";
import { loginUser } from "../../utils/queries/authenticate";
import { useContext } from 'react';
import { AuthContext } from '../../components/AuthProvider';
export default function () {
    const [isAuthenticated,setIsAuthenticated] = useContext(AuthContext);


    return (
        <>
        <BodyForm className={styles.form} onSubmit={(event,formData ) => {
            console.log(formData.username)
            loginUser(formData.username,formData.password).then((response) => {
                console.log(response)
                setIsAuthenticated(response);
            });
        }}>
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