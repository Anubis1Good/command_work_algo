import React from 'react';
import styles from './Messages.module.css';
import Message from './Message';
const MessagesForwardRef = React.forwardRef((props, ref) => {
    const messagesRef = ref || React.createRef();


   
  

  
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
}, (props, ref) => React.forwardRef(Messages, ref))

export default MessagesForwardRef;
