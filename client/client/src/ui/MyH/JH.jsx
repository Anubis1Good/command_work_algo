import styles from  './JH.module.css'
export default function (props){
    return (
        <h1 className={`${styles[props.clName]}`}>
            {props.title}
        </h1>
    )
}