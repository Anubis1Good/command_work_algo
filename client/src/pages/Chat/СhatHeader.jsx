import {useState } from 'react';
import { leaveChat,deleteChat, addInvite } from '../../utils/queries/chats';
import styles from './ChatHeader.module.css';
import {useNavigation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import InviteMenu from './Menus/InviteMenu';
export default function (props) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isInviteMenuOpen, setIsInviteMenuOpen] = useState(false);

    function handleAddInviteClick() {
        addInvite(props.currentChat.id).then((invite) => {
            try {
                console.log(invite);
            navigator.clipboard.writeText(invite.token).then(() => {
                toast.success('Приглашение скопировано в буфер обмена, оно закончится '+new Date(invite.expiry_time).toLocaleString(), {duration: 5000});
            })
        } catch (error) {
            toast.error('Не удалось скопировать приглашение в буфер обмена');
        }
        });
    }

    return props.currentChat.id && (

        <div>
           
            <div className={styles.chatHeader}>
                {props.children}
                <div className={styles.chatHeaderTitle}>{props.currentChat.name}</div>
                { props.currentChat.id !== -1 && <div className={styles.chatHeaderButtons}>
                    <button className={styles.chatHeaderButton} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>...</button>
                </div>}
            </div>
            
            {isDropdownOpen && props.currentChat.id !== -1?
            <div className={styles.chatHeaderDropdown}>
                <div className={styles.chatHeaderDropdownItem} onClick={() => {setIsDropdownOpen(false); handleAddInviteClick()}}>Создать приглашение</div>

                <div className={styles.chatHeaderDropdownItem} onClick={() => {setIsInviteMenuOpen(true);setIsDropdownOpen(false)}}>Мои Приглашения</div>
                
                <div className={styles.chatHeaderDropdownItem} onClick={() => {leaveChat(props.currentChat.id);setIsDropdownOpen(false)}}>Покинуть чат</div>

                {props.currentChat.owner_id === props.user.id ? 
                    <>
                        
                        <div className={styles.chatHeaderDropdownItem} onClick={() => {deleteChat(props.currentChat.id);setIsDropdownOpen(false)}}>Удалить чат</div> 
                    </>
                : null}
                
            </div>
            
            : null}
           
           <InviteMenu setIsInviteMenuOpen={setIsInviteMenuOpen} isInviteMenuOpen={isInviteMenuOpen} currentChat={props.currentChat} user={props.user} />
        </div>)  
}