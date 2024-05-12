
import { useEffect, useRef, useState } from 'react';
import { getJoinedChats,getChatMessages, joinChat, createChat, getChat } from "../../utils/queries/chats";
import BodyForm from '../../components/BodyForm/BodyForm';
import styles from './ChatPage.module.css';
import { sendMessage } from '../../utils/queries/messages';

export default function () {

    const [messages, setMessages] = useState([]);
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState({});

    function renderMessages() {
        return messages ? messages.map(message => (
            <div key={message.id} className="message">
                <p>{message.message}, от {currentChat.members.find(member => member.id === message.sender_id).username}</p>
            </div>
        )): <p>Нет сообщений</p>
    }
    
    useEffect(() => {
        getJoinedChats().then((response) => {
            setChats(response);
        });
    },[]);

    useEffect(() => {
        if (currentChat.id) {
        const eventSource = new EventSource('/api/v1/chats/'+currentChat.id+'/messages/live');
    
        eventSource.onmessage = (event) => {
          const newMessage = JSON.parse(event.data);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
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
    function renderChats() {
        return chats ? chats.map(chat => (
            <div key={chat.id} onClick={() => {getChat(chat.id).then((response) => setCurrentChat(response))}}>{chat.name}</div>
        )) : <p>Нет чатов</p>
        }
    
    const dialogRef = useRef(null);
    const joindialogRef = useRef(null);
    return (<>
    <button className={styles.create_button} onClick={() => {dialogRef.current.showModal();}}>Создать чат</button>

    <dialog className={styles.create_dialog} ref={dialogRef}>

        <button onClick={() => dialogRef.current.close()}>Закрыть</button>

        <BodyForm resource={'/api/v1/chats'} style={styles.create_form} method='POST' navigateTo='' onSubmit={
            (event,formData ) => {
                createChat(formData.name); 
                dialogRef.current.close();
            }
            }
            >
            <input type="text" name="name" placeholder="Название чата" />
            <input type="submit" value="Создать" />
        </BodyForm>

    </dialog>

    <button className={styles.join_button} onClick={() => { joindialogRef.current.showModal();}}>Присоединиться к чату</button>

    <dialog className={styles.join_dialog} ref={joindialogRef}>

        <button onClick={() => joindialogRef.current.close()}>Закрыть</button>

        <BodyForm  navigateTo='' onSubmit={
            (event,formData ) => {
                joinChat(formData.id); 
                joindialogRef.current.close();}}>
            <input type="text" name="id" placeholder="ID чата" />
            <input type="submit" value="Присоединиться" />
        </BodyForm>

    </dialog>

    <div className={ styles.chat }>
        <div className={styles.chat_list}>
            {renderChats()}
        </div>
        <div className={styles.messages}>
            {renderMessages()}
        </div>

        <BodyForm style={styles.send} navigateTo='' onSubmit={(event,formData ) => {
                sendMessage(currentChat.id,formData.message);
            }
        }>
            <input type="text" name="message" placeholder="Текст сообщения" />
            <input type="submit" value="Отправить" />
        </BodyForm>
        </div></>
    )
}