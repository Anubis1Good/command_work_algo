import { Link } from "react-router-dom"
import cl from './Menu.module.css'
export default function (){
    return (
        <ul className={cl.menu}>
            <li><Link className={cl.item} to={'/'}>Мой аккаунт</Link></li>
            <li><Link className={cl.item} to={'/about'}>Чаты</Link></li>
            <li><Link className={cl.item} to={'/test'}>Пользователи</Link> </li>
        </ul>
    )
}