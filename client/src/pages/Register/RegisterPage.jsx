import { useRef } from "react"
import { fetchRegistration } from "../../utils/queries/registration"
import Header from "../../components/Header/Header"
import styles from "./RegisterPage.module.css"

export default function () {
    const registrationForm = useRef()
    async function formSend(e){
        e.preventDefault()
        const {username, password} = registrationForm.current
        try{
         let response = await fetchRegistration(username.value, password.value)
         console.log(response.body)
        }
        catch(error){
            console.error(error)
        }
        registrationForm.current.reset()
    }
    return (
        <>
        <Header/>

        <form onSubmit={(e)=>formSend(e)} ref={registrationForm} className={styles.form}>
            <label htmlFor="username"> Username</label>
            <input type="text" name="username" id="username" />

            <label htmlFor="password"> Password</label>
            <input type="password" name="password" id="password" />

            <input type="submit" value="Register" />
        </form>
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