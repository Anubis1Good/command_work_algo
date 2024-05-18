import styles from './Messages.module.css'

import { useRef, useEffect } from 'react';
export default function(props) {
    const messagesRef = useRef(null);
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

    useEffect(() => {
        if (messagesRef.current && !(messagesRef.current.scrollHeight - messagesRef.current.scrollTop === messagesRef.current.clientHeight)) {
          messagesRef.current.scrollTo({
            top: messagesRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, [props.messages]);
  

  
    function renderMessages() {
        return props.messages ? props.messages.map((message) => {
            return (
                <div key={message.id}   className={ styles.message+(message.sender_id === props.user.id ? (" "+styles.messageOwn) :'') } >
                    <div className={styles.messageHeader}><div className={styles.messageAuthor}>{ getAuthorName(message.sender_id)}</div>
                    <div className={styles.messageTime}>{new Date(message.send_time).toLocaleString()}</div></div>
                    <div className={styles.messageContent}>{message.message}</div>


                </div>
            )
        }) : <p>Нет сообщений</p>
    }
    return (
        <div  ref={messagesRef} className={styles.messages}>

            {renderMessages()}

        </div>
    )
}