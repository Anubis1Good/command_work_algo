import {useState } from 'react';
import { leaveChat,deleteChat } from '../../utils/queries/chats';
import styles from './ChatHeader.module.css';
export default function (props) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    function renderMembers() {
        return props.currentChat.members ? props.currentChat.members.map(member => (
            <div key={member.id} className={styles.chatHeaderMember}>{member.username}</div>
        )) : null
    }
    return props.currentChat.id && (

        <div>
            <div className={styles.chatHeader}>
                <div className={styles.chatHeaderTitle}>{props.currentChat.name}</div>
                {renderMembers()}
                <div className={styles.chatHeaderButtons}>
                    <button className={styles.chatHeaderButton} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>...</button>
                </div>
            </div>
            
            {isDropdownOpen ?
            <div className={styles.chatHeaderDropdown}>
                <div className={styles.chatHeaderDropdownItem} onClick={() => {leaveChat(props.currentChat.id);setIsDropdownOpen(false)}}>Покинуть чат</div>
                {props.currentChat.owner_id === props.user.id ? <div className={styles.chatHeaderDropdownItem} onClick={() => {deleteChat(props.currentChat.id);setIsDropdownOpen(false)}}>Удалить чат</div> : null}
            </div>
            
            : null}
           

        </div>)  
}