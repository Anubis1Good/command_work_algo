/* eslint-disable react/prop-types */
import { IoMdClose } from 'react-icons/io';
import styles from './UserMenu.module.css';
import { useEffect, useRef, useState } from 'react';
import { banUser, getBannedUsers, kickUser, unbanUser } from '../../../utils/queries/chats';


const UserMenu = ( props ) => {
  const dialogRef = useRef(null);
  const [bannedUsers, setBannedUsers] = useState([]);
  useEffect(() => {
    if (props.isUserMenuOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [props.isUserMenuOpen]);

  useEffect(()=>{
    getBannedUsers(props.currentChat.id).then((response)=>{
      setBannedUsers(response)
    })
  },[props.currentChat.id])


  return (
    <dialog className={styles.userMenu} ref={dialogRef}>
      <div className={styles.userMenuHeader}>
        <p>Пользователи</p>
        <button
          onClick={() => props.setIsUserMenuOpen(false)}
          className={styles.close}
        >
          <IoMdClose />
        </button>
      </div>
      <div className={styles.userMenuContent}>
        {props.currentChat.members.map((member) => {
          return (
            <div key={member.id} className={styles.userMenuMember}>
              <p>{member.username}</p>
              {props.user.id !== member.id &&
                props.user.id === props.currentChat.owner_id && (
                  <>
                    <button
                      onClick={() =>{
                        banUser(props.currentChat.id, member.id)
                          .then(() =>
                            props.setCurrentChat((chat) => ({
                              ...chat,
                              members: chat.members.filter(
                                (m) => m.id !== member.id
                              ),
                              action: 'update'
                            })))
                          setBannedUsers((users)=>[...users,member])
                        }}
                      className={styles.userMenuMemberButton}
                    >
                      Забанить
                    </button>
                    <button
                      onClick={() =>
                        kickUser(props.currentChat.id, member.id)
                          .then(() =>
                            props.setCurrentChat((chat) => ({
                              ...chat,
                              members: chat.members.filter(
                                (m) => m.id !== member.id
                              ),
                              action: 'update'
                            }))
                          )
                      }
                      className={styles.userMenuMemberButton}
                     >
                      Выгнать
                    </button>
                  </>
                )}
            </div>
          );
        })}
      </div>
     {bannedUsers.length > 0 && <div className={styles.userMenuContent}>
        {bannedUsers.map((bannedUser)=>{
          return (
            <div key={bannedUser.id} className={styles.userMenuMember}>
              <p>{bannedUser.username}</p>
              <button className={styles.userMenuMemberButton} onClick={()=>{
                unbanUser(props.currentChat.id,bannedUser.id)
                setBannedUsers((users)=>users.filter((usr)=>usr.id !== bannedUser.id))
              }}>Разбанить</button>
            </div>
          )
        })}
      </div>}
    </dialog>
  );
};

export default UserMenu;
