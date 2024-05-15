
import { useEffect, useRef, useState } from 'react';
import { getJoinedChats,getChatMessages, getChat } from "../../utils/queries/chats";
import BodyForm from '../../components/BodyForm/BodyForm';
import styles from './ChatPage.module.css';
import { sendMessage } from '../../utils/queries/messages';
import CreateDialog from './Dialogs/CreateDialog';
import JoinDialog from './Dialogs/JoinDialog';
import ChatStack from './ChatStack';
import ChatHeader from './СhatHeader';
import Messages from './Messages';

export default function () {

    const [messages, setMessages] = useState([]);
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState({});

    
    function renderMessages() {
        return !!messages.length ? messages.map((message) => {
            return (
                <div key={message.id} className={styles.message}>
                    <div className={styles.messageContent}>{message.message}</div>
                    <div className={styles.messageTime}>{new Date(message.send_time).toLocaleString()}</div>
                    <div className={styles.messageAuthor}>{ getAuthorName(message.sender_id)}</div>

                </div>
            )
        }) : <p>Нет сообщений</p>
    }
    
    useEffect(() => {
        getJoinedChats().then((response) => {
            setChats(response);
        });
    },[]);

    useEffect(() => {
        if (currentChat.id) {
        const eventSource = new EventSource('/api/v1/live/' + currentChat.id);

        eventSource.addEventListener('onSendMessage', (event) => {
          const message = JSON.parse(event.data);
          setMessages(messages => [...messages, message]);
        });
        eventSource.addEventListener('onDeleteMessage', (event) => {
          const message_id = JSON.parse(event.data).message_id;
          setMessages(messages => messages.filter(message => message.id !== message_id));
        });
    
        eventSource.addEventListener('onJoinChat', (event) => {
          const user = JSON.parse(event.data);
          currentChat.members.push(user);
        });
    
        eventSource.addEventListener('onLeaveChat', (event) => {
          const user = JSON.parse(event.data);
          currentChat.members = currentChat.members.filter(member => member.id !== user.id);
        });

        eventSource.addEventListener('onILeaveChat', (event) => {
          const chat = JSON.parse(event.data);
          setChats(chats => chats.filter(ch => ch.id !== chat.id));
          if (chat.id === currentChat.id) {
            setCurrentChat({});
            setMessages([]);
            eventSource.close();
          }
        });

        eventSource.addEventListener("onIJoinChat", (event) => {
          const chat = JSON.parse(event.data);
          setChats(chats => [...chats, chat]);
        });

        eventSource.onerror = (event) => {
          eventSource.close();
        };
        
    
        return () => {
          eventSource.close();
        };
    }
      }, [currentChat]);
    


    useEffect(() => {
        if (currentChat.id) {
            getChatMessages(currentChat.id).then((response) => {
                setMessages(response);
            });
        }
    }, [currentChat]);

    

    return (<>
    <CreateDialog />
    <JoinDialog />
    <div className={ styles.chat }>
        <ChatStack chats={chats} setCurrentChat={setCurrentChat} className={styles.chats}/>
        <div className={styles.wrapper}>

           <ChatHeader/>
            <Messages messages={messages} currentChat={currentChat} />

        <BodyForm style={styles.send} navigateTo='' onSubmit={(event,formData ) => {
                sendMessage(currentChat.id,formData.message);
            }
        }>
            <input type="text" name="message" placeholder="Текст сообщения" />
            <input type="submit" value="Отправить" />
        </BodyForm>
        </div>
        </div>
        </>
    )
}

