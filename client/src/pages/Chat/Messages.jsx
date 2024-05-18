import styles from './Messages.module.css'

import { useRef, useEffect, useState } from 'react';
import Message from './Message';

export default function(props) {
    const messagesRef = useRef(null);


    useEffect(() => {
        if (messagesRef.current && !(messagesRef.current.scrollHeight - messagesRef.current.scrollTop === messagesRef.current.clientHeight)) { // If not scrolled to the bottom
          messagesRef.current.scrollTo({
            top: messagesRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, [props.messages]);
  

  
    function renderMessages() {
        return props.messages ? props.messages.map((message) => {
            return <Message key={message.id} message={message} user={props.user} currentChat={props.currentChat} />
        }) : <p>Нет сообщений</p>
    }
    return (
        <div  ref={messagesRef} className={styles.messages}>

            {renderMessages()}

        </div>
    )
}