import styles from './Messages.module.css'
import { useState } from 'react';
import { deleteMessage } from '../../utils/queries/messages';
import Markdown from 'react-markdown';
export default function Message(props) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    function getAuthorName(user_id) {
        if (user_id) {
            let member = props.currentChat.members ? props.currentChat.members.find((member) => member.id === user_id) : null
            if (!member) {
                console.log(`Got user id ${user_id} that is not in ${props.currentChat.members}`)
                return "Error"
            }
            return member.username
        }
        return "Error"
    }

    function handleClick(event) {

        console.log(event.target)
        if (event.target === event.currentTarget) {
            setIsDropdownOpen(!isDropdownOpen);
            event.preventDefault();

        } else if (!event.target.closest(`.${styles.message}`)) {
            setIsDropdownOpen(false);
        }
    }
    return (
        <div key={props.message.id} className={styles.message+(props.message.sender_id === props.user.id ? (" "+styles.messageOwn) :'') } onClick={handleClick} >
            <div className={styles.messageHeader}>
                <div className={styles.messageAuthor}>{getAuthorName(props.message.sender_id)}</div>
                <div className={styles.messageTime}>{new Date(props.message.send_time).toLocaleString()}</div>
                {isDropdownOpen && (
                    <div className={styles.messageDropdown}>
                        <div className={styles.messageDropdownItem} onClick={()=>deleteMessage(props.currentChat.id,props.message.id)}>Удалить</div>

                    </div>
                )}
            </div>
            <Markdown className={styles.messageContent} >{props.message.message}</Markdown>


        </div>
    )
}
