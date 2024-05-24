/* eslint-disable react/prop-types */
import {useState } from 'react';
import { leaveChat,deleteChat, addInvite } from '../../utils/queries/chats';
import styles from './ChatHeader.module.css';
import { toast } from 'react-hot-toast';
import InviteMenu from './Menus/InviteMenu';
import copy from 'copy-to-clipboard';
import UserMenu from './Menus/UserMenu';
export default function ChatHeader(props) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isInviteMenuOpen, setIsInviteMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    function handleAddInviteClick() {
        addInvite(props.currentChat.id).then((invite) => {
            try {
                console.log(invite);
            copy(invite.token)
            toast.success('Приглашение скопировано в буфер обмена, оно закончится '+new Date(invite.expiry_time).toLocaleString(), {duration: 5000});
            
        } catch (error) {
            toast.error('Не удалось скопировать приглашение в буфер обмена, '+error);
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

                <div className={styles.chatHeaderDropdownItem} onClick={() => {setIsUserMenuOpen(true);setIsDropdownOpen(false)}}>Пользователи</div>

                <div className={styles.chatHeaderDropdownItem} onClick={() => {leaveChat(props.currentChat.id);setIsDropdownOpen(false)}}>Покинуть чат</div>

                {props.currentChat.owner_id === props.user.id ? 
                    <>
                        
                        <div className={styles.chatHeaderDropdownItem} onClick={() => {deleteChat(props.currentChat.id);setIsDropdownOpen(false)}}>Удалить чат</div> 
                    </>
                : null}
                
            </div>
            
            : null}
           
           <InviteMenu setIsInviteMenuOpen={setIsInviteMenuOpen} isInviteMenuOpen={isInviteMenuOpen} currentChat={props.currentChat} user={props.user} />
           <UserMenu setIsUserMenuOpen={setIsUserMenuOpen} isUserMenuOpen={isUserMenuOpen} setCurrentChat={props.setCurrentChat} currentChat={props.currentChat} user={props.user} />
        </div>)  
}
