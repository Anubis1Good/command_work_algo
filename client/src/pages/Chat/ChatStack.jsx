import style from './ChatStack.module.css'

import { getChat } from '../../utils/queries/chats.js';

export default function(props) {
    function renderChats() {

        return props.chats ? props.chats.map(chat => (
            <div key={chat.id} className={style.chatItem} onClick={async () => {
                chat.members = (await getChat(chat.id)).members
                props.setCurrentChat(chat)
                
            }}>{chat.name}</div>
        )) : <p>Нет чатов</p>
        }
    return (
        <>
            {props.children}
            {renderChats()}
        </>
    )
}