

import styles from "./RegisterPage.module.css"
import Header from "../../components/Header/Header"
import BodyForm from "../../components/BodyForm/BodyForm"

export default function () {
    return (
        <>
        <Header/>
        <BodyForm resource="http://localhost:3000/api/v1/register">
            <label htmlFor="username">Введите логин</label>
            <input className={styles.login} type="text" name="username" id="username" />
          
            <label htmlFor="password">Введите пароль</label>
            <input className={styles.login} type="password" name="password" id="password" />

            {/* <label htmlFor="password">Повторите пароль</label>
            <input className={styles.password} type="password" name="password" id="password" /> */}

            <button className={styles.register} type="submit">Зарегистрироваться</ button>
        </BodyForm>
        </>
    )

}
