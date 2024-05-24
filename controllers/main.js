export const main= (req,res)=>{
    res.json({response:"Welcome to Торпеда Application Programming Interface!"});}
import { EventEmitter } from 'node:events';
import { authenticate } from './utils.js';
import { chats,messages } from '../db/controller.js';
export const emitter = new EventEmitter();

export const users = {}

export const sse= async (req, res) => {
    let user_id = await authenticate(req, res);
    if (!user_id) {
        return res.json({ error: 'Not logged in or invalid token' }).status(401);
    }
    
    res.writeHead(200, {
        'Connection': 'keep-alive',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'X-Accel-Buffering': 'no'
    });
    users[user_id] = {res:res, chat_id:req.params.chat_id};
    res.on('close', () => {
        delete users[user_id];
    })


}

emitter.on("onSendMessage", async (message_id, chat_id) => {
    try {
        let members = await chats.getMembersFromChat(chat_id);
        console.log(members)
        let message = await messages.getMessage(message_id);
        
        for (let member of members) {
            if (users[member.id]) {
                users[member.id].res.write("event: onSendMessage\n");
                users[member.id].res.write(`data: ${JSON.stringify(message)}\n\n`);
            }
        }
    } catch (error) {
        console.error(error);
    }
})

emitter.on("onLeaveChat", async (chat_id, user_id) => { // user_id = the id of the user who left
    try {
        let members = await chats.getMembersFromChat(chat_id);
        let chat = await chats.getChat(chat_id);
        let user = members.find(member => member.id == user_id);
        for (let member of members) {
            if (member.id == user_id && users[user_id]) { // event only for the user who left
               
                users[user_id].res.write("event: onILeaveChat\n");
                users[user_id].res.write(`data: ${JSON.stringify(chat)}\n\n`);
                continue;
            }
            if (users[member.id]) {
                users[member.id].res.write("event: onLeaveChat\n");
                users[member.id].res.write(`data: ${JSON.stringify(user)}\n\n`);
            }
        }
    } catch (error) {
        console.error(error);
    }
})

emitter.on("onDeleteMessage", async (message, chat) => {
    try {
        let members = await chats.getMembersFromChat(chat.id);
        for (let member of members) {
            if (users[member.id]) {
                users[member.id].res.write("event: onMessageDelete\n");
                users[member.id].res.write(`data: ${JSON.stringify(message)}\n\n`);
            }
        }
    } catch (error) {
        console.error(error);
    }
    await messages.deleteMessage(chat.id,message.id);
})

emitter.on("onJoinChat", async (chat_id, user_id) => { // user_id = the id of the user who joined
    try {
        let members = await chats.getMembersFromChat(chat_id);
        let chat = await chats.getChat(chat_id);
        let user = members.find(member => member.id == user_id);
        for (let member of members) {
            if (member.id == user_id && users[user_id]) { // event only for the user who joined
                users[user_id].res.write("event: onIJoinChat\n");
                users[user_id].res.write(`data: ${JSON.stringify(chat)}\n\n`);
                continue;
            }
            if (users[member.id]) {
                users[member.id].res.write("event: onJoinChat\n");
                users[member.id].res.write(`data: ${JSON.stringify(user)}\n\n`);
            }
        }
    } catch (error) {
        console.error(error);
    }
})

emitter.on("onDeleteChat", (chat,members) => {

    for (let member of members) {
        if (users[member.id]) {
            users[member.id].res.write("event: onILeaveChat\n");
            users[member.id].res.write(`data: ${JSON.stringify(chat)}\n\n`);
        }
    }
    console.log("onDeleteChat")
    chats.deleteChat(chat.id);
})
