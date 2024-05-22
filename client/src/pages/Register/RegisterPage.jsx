import styles from "./RegisterPage.module.css"
import Header from "../../components/Header/Header"
import BodyForm from "../../components/BodyForm/BodyForm"

import { Link } from "react-router-dom";
import { getMyself, registerUser } from "../../utils/queries/authenticate";
import { useContext } from 'react';
import { AuthContext } from '../../components/AuthProvider';
import toast from "react-hot-toast";
export default function () {

    const [isAuthenticated,setAuthenticated,user,setUser] = useContext(AuthContext);
    return (
        <>
        <BodyForm className={styles.form} resource="/api/v1/register" onSubmit={async (event,formData) => {
            const data = await registerUser(formData.username,formData.password)
            setAuthenticated(data.ok);
            if(data.ok) {
                toast.success("Вы успешно зарегистрировались");
                setUser(await getMyself());
            }
            else toast.error((await data.json()).error);

        }}>
            <h1>Регистрация</h1>
            <label htmlFor="username"> Имя пользователя</label>
            <input className={styles.login} type="text" name="username" id="username" />

            <label htmlFor="password"> Пароль</label>
            <input className={styles.password} type="password" name="password" id="password" />

            <button className={styles.submit} type="submit">Зарегистрироваться</button>
        <p>Есть аккаунт? <Link to="/login">Вход</Link></p>
        </BodyForm>
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
