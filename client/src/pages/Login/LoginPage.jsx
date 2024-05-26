// <<<<<<< master

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
            <h1>Вход</h1>
            <label htmlFor="username"> Имя пользователя</label>
            <input className={styles.login} type="text" name="username" id="username" />

            <label htmlFor="password"> Пароль</label>
            <input className={styles.password} type="password" name="password" id="password" />

            <button className={styles.submit} type="submit">Вход</button>
            <p>Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>
        </BodyForm>
        </>
    )
// =======

// import styles from "./LoginPage.module.css"
// import Header from "../../components/Header/Header"
// import BodyForm from "../../components/BodyForm/BodyForm"

// import { Link } from "react-router-dom";
// import { loginUser } from "../../utils/queries/authenticate";
// import { useContext } from 'react';
// import { AuthContext } from '../../components/AuthProvider';
// export default function () {
//     const [isAuthenticated,setIsAuthenticated] = useContext(AuthContext);


//     return (
//         <>
//         <BodyForm className={styles.form} onSubmit={(event,formData ) => {
//             console.log(formData.username)
//             loginUser(formData.username,formData.password).then((response) => {
//                 console.log(response)
//                 setIsAuthenticated(response);
//             });
//         }}>
//             <h1>Вход</h1>
//             <label htmlFor="username"> Имя пользователя</label>
//             <input className={styles.login} type="text" name="username" id="username" />

//             <label htmlFor="password"> Пароль</label>
//             <input className={styles.password} type="password" name="password" id="password" />

//             <button className={styles.submit} type="submit">Вход</button>
//             <p>Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>
//         </BodyForm>
//         </>
//     )
// >>>>>>> master
}