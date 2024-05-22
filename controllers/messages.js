import {chats, messages, tokens, users} from '../db/controller.js'
import {authenticate} from './utils.js'
import {emitter} from './main.js'



export const getMessages = async (req, res) => {
    const user_id = await authenticate(req, res);
    if (!user_id) {
        return res.json({ error: 'Not logged in or invalid token' }).status(401);
    }

    if (!req.params.chat_id) {
        return res.json({ error: 'Invalid parameters' }).status(400);
    }
    try {

        if (! await chats.isUserinChat(user_id, req.params.chat_id)) {
            return res.json({ error: 'Not a member of this chat' }).status(403);
        }

        const msgs = await messages.getMessagesFromChat(req.params.chat_id);
        res.json({ response: msgs }).status(200);

    } catch (error) {
        console.error(error);
        res.json({ error: 'Internal server error' }).status(500);
    }
}


export const sendMessage = async (req, res) => {
    const user_id = await authenticate(req, res);
    if (!user_id) {
        return res.json({ error: 'Not logged in or invalid token' }).status(401);
    }

    if (!req.params.chat_id) {
        return res.json({ error: 'Invalid parameters' }).status(400);
    }

    try {

        if (! await chats.isUserinChat(user_id, req.params.chat_id)) {
            return res.json({ error: 'Not a member of this chat' }).status(403);
        }

        
        let message_id = await messages.createMessage(req.params.chat_id, user_id, req.body.message);

        emitter.emit("onSendMessage", message_id, req.params.chat_id);
        res.json({ response: 'Message sent' }).status(200);

    } catch (error) {
        console.error(error);
        res.json({ error: 'Internal server error' }).status(500);
    }
}

export const deleteMessage = async (req, res) => {
    const user_id = await authenticate(req, res);
    if (!user_id) {
        return res.json({ error: 'Not logged in or invalid token' }).status(401);
    }

    if (!req.params.chat_id || !req.params.message_id) {
        return res.json({ error: 'Invalid parameters' }).status(400);
    }

    try {

        if (! await chats.isUserinChat(user_id, req.params.chat_id)) {
            return res.json({ error: 'Not a member of this chat' }).status(403);
        }
        
        if (! await messages.getMessage(req.params.message_id)) {
            return res.json({ error: 'Message not found' }).status(404);
        }
        const message = await messages.getMessage(req.params.message_id);
        if (message.sender_id !== user_id && !(await chats.isOwner( req.params.chat_id, user_id))) {
            return res.json({ error: 'Not allowed to delete this message' }).status(403);
        }


        emitter.emit("onDeleteMessage", await messages.getMessage(req.params.message_id), await chats.getChat(req.params.chat_id));
        res.json({ response: 'Message deleted' }).status(200);

    } catch (error) {
        console.error(error);
        res.json({ error: 'Internal server error' }).status(500);
    }

}

