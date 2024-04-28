import { useRef } from "react"
import { fetchRegistration } from "../utils/queries/registration"

export default function () {
    const registrationForm = useRef()
    function formSend(e){
        e.preventDefault()
        const {username, password} = registrationForm.current
        fetchRegistration(username.value, password.value)
        registrationForm.current.reset()
    }
    return (
        <>
        <h1>RegisterPage</h1>

        <form onSubmit={(e)=>formSend(e)} ref={registrationForm}>
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