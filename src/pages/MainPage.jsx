import Counter from "../components/Counter"
import JButton from "../ui/JButton"
import { Link , useNavigate} from "react-router-dom"
export default function () {
    const navigate = useNavigate()
    return (
        <>
            <h1>mainPage</h1>
            <JButton title="ClickMe!" handle={()=>navigate('/about')}/>
            <Link to='/about'>Click</Link>
            <Counter initValue={5}/>
        </>
    )
}
