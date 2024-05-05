import styles from './Header.module.css'
import Nav from "../Header/Nav/Nav";
export default function (){
    return (
        <div className={styles.header}>
            <Nav/>
            <div className={styles.brand}>
                <img src="./logo.png" alt="logo" />
                <h1>Торпеда</h1>
            </div>

        </div>
    )
}
