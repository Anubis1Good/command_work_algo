import Counter from "../components/Counter"
import JButton from "../ui/JButton"
import { Link } from "react-router-dom"
export default function () {
    return (
        <>
            <h1>mainPage</h1>
            <JButton title="ClickMe!" handle={()=>alert('hello!')}/>
            <Link to={'/register'}>register</Link>
            <Counter initValue={0}/>
        </>
    )
}
