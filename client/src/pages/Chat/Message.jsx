import styles from './Messages.module.css'
import { useState } from 'react';
import { deleteMessage } from '../../utils/queries/messages';
import Markdown from 'react-markdown';
import { FaEllipsisVertical } from 'react-icons/fa6';
import { getUser} from '../../utils/queries/chats';
export default function Message(props) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    function getAuthorName(user_id) {
        let member = props.currentChat.members.find(member => member.id === user_id)
        if ( member ) {
            return member.username
        } else {
            getUser(user_id).then((data) => {
                return data.name
            })
        }

    }

    function handleClick(event) {
        if (event.target === event.currentTarget) {
            setIsDropdownOpen(!isDropdownOpen);
            event.preventDefault();
        }
    }

    function handleDropdownClick(event) {

            setIsDropdownOpen(!isDropdownOpen);
    }

    return (
        <div key={props.message.id} className={styles.message+(props.message.sender_id === props.user.id ? (" "+styles.messageOwn) :'') }>
            <div className={styles.messageHeader}>
                <div className={styles.messageAuthor}>{getAuthorName(props.message.sender_id)}</div>
                
{        (props.user.id === props.message.sender_id || props.currentChat.owner_id === props.user.id )&&       ( <button className={styles.messageDropdownButton} onClick={handleDropdownClick}>
    <FaEllipsisVertical />
                </button> ) }
                {isDropdownOpen && (
                    <div className={styles.messageDropdown}>
                        <div className={styles.messageDropdownItem} onClick={()=>deleteMessage(props.currentChat.id,props.message.id)}>Удалить</div>

                    </div>
                )}
            </div>
            <Markdown className={styles.messageContent} >{props.message.message}</Markdown>
            <div className={styles.messageTime}>{new Date(props.message.send_time).toLocaleString()}</div>

        </div>
    )
}

