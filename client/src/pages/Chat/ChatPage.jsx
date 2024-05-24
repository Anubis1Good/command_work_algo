
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { getJoinedChats,getChatMessages,getChat } from "../../utils/queries/chats";
import BodyForm from '../../components/BodyForm/BodyForm';
import styles from './ChatPage.module.css';
import { sendMessage } from '../../utils/queries/messages';
import CreateDialog from './Dialogs/CreateDialog';
import JoinDialog from './Dialogs/JoinDialog';
import ChatStack from './ChatStack';
import ChatHeader from './СhatHeader';
import Messages from './Messages';
import toast from 'react-hot-toast';
import { AuthContext } from '../../components/AuthProvider';

import Sidebar from "../../components/Header/Sidebar/Sidebar";

export default function ChatPage() {

    const [messages, setMessages] = useState([]);
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState({});
    const user = useContext(AuthContext)[2];
    const messagesRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);


    function setFirstChat(chats) {
      console.log(chats)
      if (chats.length > 0) {
        getChat(chats[0].id).then((data) => {
          setCurrentChat(data);
        })
      }
      else {
        setCurrentChat({id:-1,name:"Нет чатов", members:[], owner_id:0, create_time:0});
      }
    }

    useEffect(() => {
      messages[1] && messages[1].action === 'add' && messagesRef.current.scrollTo({ top: messagesRef.current.scrollHeight, behavior: 'smooth' });
    }, [messages]);

    const SSE = useCallback(() => {
      if (currentChat.id) {
        const eventSource = new EventSource('/api/v1/live/' + currentChat.id);

        eventSource.addEventListener('onSendMessage', (event) => {
          const message = JSON.parse(event.data);
          setMessages(messages => [[...messages[0], message],{action:'add'}]);

        });
        eventSource.addEventListener('onMessageDelete', (event) => {
          console.log(event.data)
          const message_id = JSON.parse(event.data).id;
          setMessages(messages => [messages[0].filter(message => message.id !== message_id),{action:'delete'}]);
        });
    
        eventSource.addEventListener('onJoinChat', (event) => {
          const user = JSON.parse(event.data);
           currentChat.members.push(user)
          toast("Пользователь "+ user.username+" присоединился к чату");
        });
    
        eventSource.addEventListener('onLeaveChat', (event) => {
          const user = JSON.parse(event.data);
          currentChat.members = currentChat.members.filter(member => member.id !== user.id);
          toast("Пользователь "+ user.username+" вышел из чата");          
        });

        eventSource.addEventListener('onILeaveChat', (event) => {
          const chat = JSON.parse(event.data);
          setChats(chats => chats.filter(ch => ch.id !== chat.id));
          if (chat.id === currentChat.id) {
            setFirstChat(chats.filter(ch => ch.id !== chat.id));
            setMessages([[],{action:'clear'}]);
          }
        });

        eventSource.addEventListener("onIJoinChat",async  (event) => {
          const chat = JSON.parse(event.data);
          setChats(chats => [...chats, chat]);
          setCurrentChat(await (getChat(chat.id)));
        });

        eventSource.onerror = () => {
          eventSource.close();
          toast("Соединение разорвано, пробуем переподключиться...");
          setTimeout(() => SSE(), 3000);
        };
        
    
        return () => {
          eventSource.close();
        };
    }
    else {
      setFirstChat(chats)
    }
    },[currentChat,chats])

    useEffect(() => {
      async function fetchData() {
        const joinedChats = await getJoinedChats();
        setChats(joinedChats);
        setFirstChat(joinedChats);
      }
      fetchData();
    },[]);

    useEffect(() => {
        if (currentChat.id) {
         return SSE();
        }
      }, [SSE, currentChat]);
    


    useEffect(() => {
        console.log(currentChat)
        if (currentChat == {}) {
            setCurrentChat({id:-1,name:"Нет чатов", members:[], owner_id:0, create_time:0});
        }
        if (currentChat.id) {
            getChatMessages(currentChat.id).then((response) => {
                setMessages([response,{action:'add'}]);
            });
        }
    }, [currentChat]);

       function renderChat () {
      return !!chats && (
        <div className={ styles.chat }>
          
          <Sidebar isOpen={isOpen} setOpen={setIsOpen} className={styles.sidebar}>
          <ChatStack chats={chats} setCurrentChat={setCurrentChat} className={styles.chats}>
            <div className={styles.dialogsWrapper}>
            <CreateDialog />
            <JoinDialog />
            </div>
          </ChatStack>
          </Sidebar>
          <div className={styles.wrapper}>
            <ChatHeader user={user} currentChat={currentChat} setCurrentChat={setCurrentChat}><button className={styles.burger} onClick={() => setIsOpen(!isOpen)}>Чаты</button></ChatHeader>
            <Messages messages={messages[0]} currentChat={currentChat}  user={user} ref={messagesRef} />
            { currentChat.id !== -1 && (
              <BodyForm className={styles.send} navigateTo='' onSubmit={(event,formData ) => {sendMessage(currentChat.id, formData.message);}}>
                <input type="text" name="message" required placeholder="Текст сообщения" />
                <input type="submit" value="Отправить" />
              </BodyForm>
            )}
          </div>
        </div>)
    }

    return (<>

    {renderChat()}

        </>
    )
}

