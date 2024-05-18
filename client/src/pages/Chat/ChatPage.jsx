
import { useContext, useEffect, useState } from 'react';
import { getJoinedChats,getChatMessages,getChat } from "../../utils/queries/chats";
import BodyForm from '../../components/BodyForm/BodyForm';
import styles from './ChatPage.module.css';
import { sendMessage } from '../../utils/queries/messages';
import CreateDialog from './Dialogs/CreateDialog';
import JoinDialog from './Dialogs/JoinDialog';
import ChatStack from './ChatStack';
import ChatHeader from './СhatHeader';
import Messages from './Messages';

import { AuthContext } from '../../components/AuthProvider';
import { IoSend } from 'react-icons/io5';

export default function () {

    const [messages, setMessages] = useState([]);
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState({});
    const [authenticated, setIsAuthenticated,user,setUser] = useContext(AuthContext);


    useEffect(() => {
      async function fetchData() {
        const joinedChats = await getJoinedChats();
        setChats(joinedChats);
        if (joinedChats.length > 0) {
          setCurrentChat(await getChat(joinedChats[0].id));
        }
      }
      fetchData();
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

    function renderChat () {
      return !!chats.length && (
        <div className={ styles.chat }>
          <ChatStack chats={chats} setCurrentChat={setCurrentChat} className={styles.chats}/>
          <div className={styles.wrapper}>
            <ChatHeader user={user} currentChat={currentChat}/>
            <Messages messages={messages} currentChat={currentChat}  user={user}/>
            {currentChat.id && (
              <BodyForm className={styles.send} navigateTo='' onSubmit={(event,formData ) => {sendMessage(currentChat.id, formData.message);}}>
                <input type="text" name="message" required placeholder="Текст сообщения" />
                <input type="submit" value="Отправить" />
              </BodyForm>
            )}
          </div>
        </div>)
    }

    return (<>
    <CreateDialog />
    <JoinDialog />
    {renderChat()}

        </>
    )
}

