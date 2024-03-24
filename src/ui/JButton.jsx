import styles from  './JButton.module.css'

export default function (props){
    return (
        <button className={styles.normal} onClick={props.handle}>
            {props.title}
        </button>
    )
}

