import { useState } from "react";
import JButton from "../ui/JButton";

export default function (props){
    const [count, setCount] = useState(props.initValue)
    return (
        <div>
            <h1>Счет: {count}</h1>
            <JButton title='+' handle={()=>{
                setCount(count + 1)
            }}/>
            <JButton title='-' handle={()=>{
                setCount(count - 1)
            }}/>
        </div>
    )
}