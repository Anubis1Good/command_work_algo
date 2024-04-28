import styles from  './JP.module.css'
export default function (props){
    return (
        <p className={`${styles[props.clName]}`}>
            {props.title}
        </p>
    )
}