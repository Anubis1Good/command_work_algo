
import styles from "./LoginPage.module.css"
import Header from "../../components/Header/Header"
import BodyForm from "../../components/BodyForm/BodyForm"

import { Link } from "react-router-dom";
import { getMyself, loginUser } from "../../utils/queries/authenticate";
import { useContext } from 'react';
import { AuthContext } from '../../components/AuthProvider';
import toast from "react-hot-toast";
export default function () {
    const [isAuthenticated,setIsAuthenticated,user,setUser] = useContext(AuthContext);


    return (
        <>
        <BodyForm className={styles.form} onSubmit={async (event,formData ) => {
            const response = await loginUser(formData.username,formData.password)
                setIsAuthenticated(response.ok);
                if(response.ok) {
                    toast.success("Вы успешно вошли");
                    setUser(await getMyself());
                    }
                else toast.error((await response.json()).error);

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