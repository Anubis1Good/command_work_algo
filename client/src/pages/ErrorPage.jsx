import styles from "./ErrorPage.module.css"
import image from './../assets/404.png'
export default function () {
    return (
        <>        
                <img className={styles.error} src={image} alt="404"/>
                <p>{"Страница не найдена("}</p>
        </>
    )
}
