

import styles from "./RegisterPage.module.css"
import Header from "../../components/Header/Header"
import BodyForm from "../../components/BodyForm/BodyForm"
export default function () {

    return (
        <><Header/>
        <BodyForm resource="http://localhost:3000/api/v1/register">
            <label htmlFor="username"> Username</label>
            <input type="text" name="username" id="username" />

            <label htmlFor="password"> Password</label>
            <input type="password" name="password" id="password" />

            <button type="submit">Register</button>
        </BodyForm></>
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