import style from './ChatPage.module.css'

import { getChat } from '../../utils/queries/chats.js';

export default function(props) {
    function renderChats() {
        return props.chats ? props.chats.map(chat => (
            <div key={chat.id} onClick={() => {getChat(chat.id).then((response) => props.setCurrentChat(response))}}>{chat.name}</div>
        )) : <p>Нет чатов</p>
        }
    return (
        <>
            {renderChats()}
        </>
    )
}