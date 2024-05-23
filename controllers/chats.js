import {chats, tokens, users, messages} from '../db/controller.js'
import { emitter } from './main.js';
import {authenticate} from './utils.js'


export const createChat = async (req, res) => {

    const { name } = req.body;
    if (!name) {
        return res.json({ error: 'Invalid parameters' }).status(400);
    }
    const user_id = await authenticate(req, res);
    if (!user_id) {
        return res.json({ error: 'Not logged in or invalid token' }).status(401);
    }

    try {
        const chat_id = await chats.createChat(name, user_id);

        emitter.emit("onJoinChat", chat_id, user_id);
        res.json({ response: chat_id }).status(201);
    } 
    catch (error) {
        console.error(error);
        res.json({ error: 'Internal server error' }).status(500);
    }
}    

export const getJoinedChats = async (req, res) => {
    const user_id = await authenticate(req, res);
    if (!user_id) {
        return res.json({ error: 'Not logged in or invalid token' }).status(401);
    }

    try {
        let chats_list = await chats.getChatsFromUser(user_id);
        console.log(chats_list)  


        res.json({ response: chats_list }).status(200);

    } catch (error) {
        console.error(error);
        res.json({ error: 'Internal server error' }).status(500);
    }
}


export const getChat = async (req, res) => {
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
        const chat = await chats.getChat(req.params.chat_id);
        chat.members = await chats.getMembersFromChat(req.params.chat_id);
        res.json({ response: chat }).status(200);
    } catch (error) {
        console.error(error);
        res.json({ error: 'Internal server error' }).status(500);
    }
}


export const getMembers = async (req, res) => {
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

        const members = await chats.getMembersFromChat(req.params.chat_id);
        res.json({ response: members }).status(200);

    } catch (error) {
        console.error(error);
        res.json({ error: 'Internal server error' }).status(500);
    }
}

export const joinChat = async (req, res) => {
    const user_id = await authenticate(req, res);
    if (!user_id) {
        return res.json({ error: 'Not logged in or invalid token' }).status(401);
    }

    try {
        const invite = await chats.getInvite(req.body.token);

        if (!invite) {
            return res.json({ error: 'Invalid invite' }).status(403);
        }
        if (await chats.isUserinChat(user_id,invite.chat_id)) {
            return res.json({ error: 'Already a member of this chat' }).status(403);
        }

        if (!await chats.exists(invite.chat_id)) {
            return res.json({ error: 'Chat doesnt exist you idiot sandwitch' }).status(404);
        }
        if (await chats.isBanned(user_id,invite.chat_id)) {
            return res.status(403).json({error:"You're banned from this chat"})
        }
        
        
        if (!invite) {
            return res.json({ error: 'Invalid invite' }).status(403);
        }

       
        await chats.addMember(invite.chat_id,user_id);

        emitter.emit("onJoinChat", invite.chat_id, user_id);
        res.json({ response: 'Joined chat' }).status(200);

    } catch (error) {
        console.error(error);
        res.json({ error: 'Internal server error' }).status(500);
    }
}

export const leaveChat = async (req,res) => {

    const user_id = await authenticate(req, res);
    if (!user_id) {
        return res.json({ error: 'Not logged in or invalid token' }).status(401);
    }
    if (!req.params.chat_id) {
        return res.json({ error: 'Invalid parameters' }).status(400);
    }
    try {
        if (!await chats.isUserinChat(user_id, req.params.chat_id)) {
            return res.json({ error: 'Not a member of this chat' }).status(403);
        }
        emitter.emit("onLeaveChat", req.params.chat_id, user_id);
        await chats.deleteMember(req.params.chat_id,user_id);

        res.json({ response: 'Left chat' }).status(200);

    } catch (error) {
        console.error(error);
        res.json({ error: 'Internal server error' }).status(500);
    }

}

export const deleteChat = async (req, res) => {
    const user_id = await authenticate(req, res);
    if (!user_id) {
        return res.json({ error: 'Not logged in or invalid token' }).status(401);
    }
    if (!req.params.chat_id) {
        return res.json({ error: 'Invalid parameters' }).status(400);
    }
    try {
        if (!await chats.exists(req.params.chat_id)) {
            return res.json({ error: 'Chat not found' }).status(404);
        }       
        if (!await chats.isOwner(req.params.chat_id, user_id)) {
            return res.json({ error: 'Not the owner of this chat' }).status(403);
        }

    emitter.emit("onDeleteChat", await chats.getChat(req.params.chat_id), await chats.getMembersFromChat(req.params.chat_id));

    res.json({ response: 'Deleted chat' }).status(200);

    } catch (error) {
        console.error(error);
        res.json({ error: 'Internal server error' }).status(500);
    }
}

export const transferOwnership = async (req, res) => {
    const user_id = await authenticate(req, res);
    if (!user_id) {
        return res.json({ error: 'Not logged in or invalid token' }).status(401);
    }
    if (!req.params.chat_id) {
        return res.json({ error: 'Invalid parameters' }).status(400);
    }
    try {
        if (!await members.isOwner(user_id, req.params.chat_id)) {
            return res.json({ error: 'Not the owner of this chat' }).status(403);
        }
        await chats.transferOwnership(req.params.chat_id, req.body.user_id);
        res.json({ response: 'Transferred ownership' }).status(200);

    } catch (error) {
        console.error(error);
        res.json({ error: 'Internal server error' }).status(500);
    }
}
export const renameChat = async (req, res) => {
    const user_id = await authenticate(req, res);
    if (!user_id) {
        return res.json({ error: 'Not logged in or invalid token' }).status(401);
    }
    if (!req.params.chat_id) {
        return res.json({ error: 'Invalid parameters' }).status(400);
    }
    try {
        if (!await members.isOwner(user_id, req.params.chat_id)) {
            return res.json({ error: 'Not the owner of this chat' }).status(403);
        }
        await chats.renameChat(req.params.chat_id, req.body.name);
        res.json({ response: 'Renamed chat' }).status(200);

    } catch (error) {
        console.error(error);
        res.json({ error: 'Internal server error' }).status(500);
    }
}

export const addInvite = async (req, res) => {
    const user_id = await authenticate(req, res);
    if (!user_id) {
        return res.json({ error: 'Not logged in or invalid token' }).status(401);
    }
    if (!req.params.chat_id) {
        return res.json({ error: 'Invalid parameters' }).status(400);
    }
    try {
        const invite = await chats.addInvite(req.params.chat_id, user_id);
        res.json({ response: invite }).status(200);

    } catch (error) {
        console.error(error);
        res.json({ error: 'Internal server error' }).status(500);
    }
}

export const deleteInvite = async (req, res) => {
    const user_id = await authenticate(req, res);
    if (!user_id) {
        return res.status(401).json({ error: 'Not logged in or invalid token' });
    }
    if (!req.params.chat_id) {
        return res.status(400).json({ error: 'Invalid parameters' });
    }
    try {
        await chats.deleteInvite(req.params.chat_id, req.body.invite_id);
        res.json({ response: 'Deleted invite' }).status(200);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
export const getUserInvites = async (req, res) => {
    const user_id = await authenticate(req, res);
    if (!user_id) {
        return res.status(401).json({ error: 'Not logged in or invalid token' });
    }
    if (!req.params.chat_id) {
        return res.status(400).json({ error: 'Invalid parameters' });
    }
    try {
        const invites = await chats.getUserInvites(user_id, req.params.chat_id);
        res.json({ response: invites }).status(200);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
export const kickUser = async (req, res) => {
    const user_id = await authenticate(req, res);
    if (!user_id) {
        return res.status(401).json({ error: 'Not logged in or invalid token' });
    }
    if (!req.params.chat_id) {
        return res.status(400).json({ error: 'Invalid parameters' });
    }
    try {
        if (!await chats.isOwner(req.params.chat_id,user_id)) {
            return res.status(403).json({ error: 'Not the owner of this chat' });
        }
        emitter.emit('onLeaveChat', req.params.chat_id, req.body.user_id);
        chats.deleteMember(req.params.chat_id,req.body.user_id);

        res.json({ response: 'Kicked user' }).status(200);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const banUser = async (req, res) => {
    const user_id = await authenticate(req, res);
    if (!user_id) {
        return res.status(401).json({ error: 'Not logged in or invalid token' });
    }
    if (!req.params.chat_id) {
        return res.status(400).json({ error: 'Invalid parameters' });
    }
    try {
        if (!await chats.isOwner( req.params.chat_id,user_id)) {
            return res.status(403).json({ error: 'Not the owner of this chat' });
        }
        emitter.emit('onLeaveChat', req.params.chat_id, req.body.user_id);
        await chats.deleteMember(req.params.chat_id,req.body.user_id);
        await chats.banUser(req.body.user_id,req.params.chat_id);

        res.json({ response: 'Banned user' }).status(200);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const unbanUser = async (req, res) => {
    const user_id = await authenticate(req, res);
    if (!user_id) {
        return res.status(401).json({ error: 'Not logged in or invalid token' });
    }
    if (!req.params.chat_id) {
        return res.status(400).json({ error: 'Invalid parameters' });
    }
    try {
        if (!await chats.isOwner(user_id, req.params.chat_id)) {
            return res.status(403).json({ error: 'Not the owner of this chat' });
        }
        await chats.unbanUser(req.params.chat_id, req.body.user_id);
        res.json({ response: 'Unbanned user' }).status(200);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getBannedUsers = async (req, res) => {
    const user_id = await authenticate(req, res);
    if (!user_id) {
        return res.status(401).json({ error: 'Not logged in or invalid token' });
    }
    if (!req.params.chat_id) {
        return res.status(400).json({ error: 'Invalid parameters' });
    }
    try {
        const bannedUsers = await chats.getBannedUsers(req.params.chat_id);
        res.json({ response: bannedUsers }).status(200);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

