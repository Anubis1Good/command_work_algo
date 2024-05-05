import styles from  './JButton.module.css'
export default function (props){
    return (
        <button className={`${styles[props.clName]}`} onClick={props.handle}>
            {props.title}
        </button>
    )
}