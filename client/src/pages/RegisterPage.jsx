import styles from './RegisterPage.module.css'
export default function () {
    return (
        <>
        <div>
            <h1>Страница Регистрации</h1>  
            <input className={styles.email} type='' placeholder='Введите email'/>
            <input className={styles.password} type='' placeholder='Введите пароль'/>
            <button className={styles.register}>Зарегистрироваться</button>
        </div>
        </>
    )

}