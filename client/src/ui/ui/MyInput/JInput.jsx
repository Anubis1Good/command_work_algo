import styles from  './JInput.module.css'
export default function (props){
    return (
        <input class={`${styles[props.clName]}`}></input>
    )
}