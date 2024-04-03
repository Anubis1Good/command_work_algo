import styles from './RegisterPage.module.css'
export default function () {
    return (
        <>
        <div>
            <h1>Страница Регистрации</h1>  
            <input className='email' type='' placeholder='Введите email'/>
            <input className='password' type='' placeholder='Введите пароль'/>
            <button className='register'>Зарегистрироваться</button>
        </div>
        </>
    )

}