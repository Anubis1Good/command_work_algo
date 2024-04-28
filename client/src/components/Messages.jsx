import React from "react"
import { useState } from "react"
export default function () {
    const [getChatId, setChatId] = useState(0); // state to store chat id
    const [getMessages, setMessages] = useState([]); // state to store messages

    // poll api every 1 second
    React.useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/v1/chats/' + getChatId + '/messages', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setMessageQueue(data);
        }
        const id = setInterval(fetchData, 1000); // adjust poll rate as needed
        return () => clearInterval(id); // cleanup on unmount
    }, []); // run only once on component mount


    return (
        <>
            <h1>Messages</h1>
            {getMessages.map((message) => (
                <div>
                    <p>{message.message}</p>
                </div>
            ))}
        </>
    )
}