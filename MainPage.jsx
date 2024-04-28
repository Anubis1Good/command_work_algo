import Counter from "../components/Counter"
import JButton from "../ui/JButton"
import { Link } from "react-router-dom"
export default function () {
    return (
        <>
            <h1>mainPage</h1>
            <JButton title="ClickMe!" handle={()=>alert('hello!')}/>
            <Counter initValue={0}/>
            <ul>
                <li><Link to={'/'}>Главная</Link></li>
                <li><Link to={'/users'}>Пользователи</Link></li>
                <li><Link to={'/error'}>ErrorPage</Link></li>
                <li><Link to={'/about'}>AboutPage</Link></li>
                <li><Link to={'/some'}>SomePage</Link></li>
                <li><Link to={'/register'}>Регистрация</Link></li>
            </ul>
        </>
    )
}
