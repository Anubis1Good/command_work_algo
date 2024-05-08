

import styles from "./RegisterPage.module.css"
import Header from "../../components/Header/Header"
import BodyForm from "../../components/BodyForm/BodyForm"

import { Link } from "react-router-dom";
export default function () {
    return (
        <><Header/>
        <BodyForm className={styles.form} resource="/api/v1/register">
            <label htmlFor="username"> Имя пользователя</label>
            <input type="text" name="username" id="username" />

            <label htmlFor="password"> Пароль</label>
            <input type="password" name="password" id="password" />

            <button type="submit">Зарегистрироваться</button>
        </BodyForm>
        <p>Есть аккаунт? <Link to="/login">Вход</Link></p>
        </>
    )

}
// =======

// export default function () {
//     return (
//         <>
//         <h1>Страница Регистрации</h1>
//         <div>
//             <input>Введите email</input>
//             <input>Введите пароль</input>
//             <input>Повторите пароль</input>
//             <button>Зарегистрироваться</button>
//         </div>
//         </>
//     )

// >>>>>>> master