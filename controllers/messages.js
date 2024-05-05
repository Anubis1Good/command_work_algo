import {chats, messages, tokens, users} from '../db/controller.js'
import {authenticate} from './utils.js'
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

        const messages = await messages.getMessagesFromChat(req.params.chat_id);
        res.json({ response: messages }).status(200);

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

        await messages.createMessage(req.params.chat_id, user_id, req.body.message);

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

        await messages.deleteMessage(req.params.chat_id, req.params.message_id);

        res.json({ response: 'Message deleted' }).status(200);

    } catch (error) {
        console.error(error);
        res.json({ error: 'Internal server error' }).status(500);
    }

}