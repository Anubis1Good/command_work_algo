import styles from './Header.module.css'

export default function (){
    return (
        <header className={styles.menu}>
            <img className={styles.logo} src="client/public/logo.jpg"/>
            <a className={styles.img-profile} href="#" ></a>
        </header>
    )
}