import styles from './Header.module.css'

export default function (){
    return (
        <header className={styles.menu}>
            <img className={styles.logo}/>
            <img className={styles.profile}/>
        </header>
    )
}