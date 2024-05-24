
import { Router } from "express";
import { main, sse } from "../controllers/main.js";
import { createUser, loginUser, logoutUser, changePassword, deleteUser, isAuthenticated, getMyself, getUser } from "../controllers/users.js";
import {getJoinedChats,getChat, createChat, getMembers, joinChat, leaveChat, transferOwnership, deleteChat, addInvite, deleteInvite, getUserInvites, renameChat, kickUser, banUser, unbanUser, getBannedUsers,} from "../controllers/chats.js";
import { deleteMessage, getMessages, sendMessage } from "../controllers/messages.js";
const router = Router()




/**
 * @api {get} / Main page
 * @apiName GetMainPage
 * @apiGroup Main
 *
 * @apiSuccess {String} message Welcome to main page
 */
router.get('/', main);

/**
 * @api {post} /register Register new user
 * @apiName PostRegister
 * @apiGroup Users
 *
 * @apiParam {String} username Username
 * @apiParam {String} password Password
 * 
 * @apiSuccess {Number} id User id
 */
router.post('/register', createUser);

/**
 * @api {post} /login User login
 * @apiName PostLogin
 * @apiGroup Users
 *
 * @apiParam {String} username Username
 * @apiParam {String} password Password
 * 
 * @apiSuccess {String} token User token
 */
router.post('/login', loginUser);

/**
 * @api {post} /logout Logout user
 * @apiName PostLogout
 * @apiGroup Users
 *
 * @apiHeader {String} Authorization User token
 * 
 * @apiSuccess {String} message Logout success
 */
router.post('/logout', logoutUser);

/**
 * @api {patch} /change_password Change user password
 * @apiName PatchChangePassword
 * @apiGroup Users
 *
 * @apiHeader {String} Authorization User token
 * @apiParam {String} password New password
 * 
 * @apiSuccess {String} message Password changed
 */
router.patch('/change_password', changePassword);

/**
 * @api {delete} /delete_user Delete user
 * @apiName DeleteDeleteUser
 * @apiGroup Users
 *
 * @apiHeader {String} Authorization User token
 * 
 * @apiSuccess {String} message User deleted
 */
router.delete('/delete_user', deleteUser);

/**
 * @api {get} /chats Get all joined chats
 * @apiName GetChats
 * @apiGroup Chats
 *
 * @apiHeader {String} Authorization User token
 * 
 * @apiSuccess {Object[]} chats Array of chats
 */
router.get('/chats', getJoinedChats);


router.get('/chats/:chat_id', getChat);
/**
 * @api {post} /chats Create chat
 * @apiName PostChats
 * @apiGroup Chats
 *
 * @apiHeader {String} Authorization User token
 * @apiParam {String} name Chat name
 * 
 * @apiSuccess {Number} id Chat id
 */
router.post('/chats', createChat);

/**
 * @api {get} /chats/:chat_id/members Get chat members
 * @apiName GetMembers
 * @apiGroup Chats
 *
 * @apiHeader {String} Authorization User token
 * @apiParam {Number} chat_id Chat id
 * 
 * @apiSuccess {Object[]} members Array of members
 */
router.get('/chats/:chat_id/members', getMembers);

/**
 * @api {post} /chats/:chat_id/join Join chat
 * @apiName PostJoinChat
 * @apiGroup Chats
 *
 * @apiHeader {String} Authorization User token
 * @apiParam {Number} chat_id Chat id
 * 
 * @apiSuccess {String} message Joined
 */
router.post('/chats/join', joinChat);

/**
 * @api {post} /chats/:chat_id/leave Leave chat
 * @apiName PostLeaveChat
 * @apiGroup Chats
 *
 * @apiHeader {String} Authorization User token
 * @apiParam {Number} chat_id Chat id
 * 
 * @apiSuccess {String} message Left
 */
router.post('/chats/:chat_id/leave', leaveChat);


/**
 * @api {post} /chats/:chat_id/messages Send message to chat
 * @apiName PostSendMessage
 * @apiGroup Messages
 *
 * @apiHeader {String} Authorization User token
 * @apiParam {Number} chat_id Chat id
 * @apiParam {String} message_id Message text
 * 
 * @apiSuccess {Number} id Message id
 */
router.post('/chats/:chat_id/message', sendMessage);

/**
 * @api {delete} /chats/:chat_id/messages/:message_id Delete message
 * @apiName DeleteDeleteMessage
 * @apiGroup Messages
 *
 * @apiHeader {String} Authorization User token
 * @apiParam {Number} chat_id Chat id
 * @apiParam {Number} message_id Message id
 * 
 * @apiSuccess {String} message Message deleted
 */
router.delete('/chats/:chat_id/message/:message_id', deleteMessage);

/**
 * @api {get} /chats/:chat_id/messages Get chat messages
 * @apiName GetGetMessages
 * @apiGroup Messages
 *
 * @apiHeader {String} Authorization User token
 * @apiParam {Number} chat_id Chat id
 * 
 * @apiSuccess {Object[]} messages Array of messages
 */
router.get('/chats/:chat_id/messages', getMessages);

/**
 * @api {get} /authenticated Check if user is authenticated
 * @apiName GetAuthenticated
 * @apiGroup Users
 *
 * @apiHeader {String} Authorization User token
 * 
 * @apiSuccess {Boolean} authenticated User authenticated
 */
router.get('/authenticated', isAuthenticated);
/**
 * @api {get} /live/:chat_id Server-sent events
 * @apiName GetLive
 * @apiGroup Main
 *
 * @apiHeader {String} Authorization User token
 * @apiParam {Number} chat_id Chat id
 *
 * @apiSuccess {String} event Event name
 * @apiSuccess {Object} data Event data
 */
router.get('/live/:chat_id', sse);

/**
 * @api {post} /chats/:chat_id/leave Leave chat
 * @apiName PostLeaveChat
 * @apiGroup Chats
 *
 * @apiHeader {String} Authorization User token
 * @apiParam {Number} chat_id Chat id
 *
 * @apiSuccess {String} message Chat left
 */
router.post('/chats/:chat_id/leave', leaveChat);

/**
 * @api {post} /chats/:chat_id/transfer Transfer ownership
 * @apiName PostTransferOwnership
 * @apiGroup Chats
 *
 * @apiHeader {String} Authorization User token
 * @apiParam {Number} chat_id Chat id
 * @apiParam {Number} user_id User id
 *
 * @apiSuccess {String} message Ownership transferred
 */
router.post('/chats/:chat_id/transfer', transferOwnership);

/**
 * @api {delete} /chats/:chat_id Delete chat
 * @apiName DeleteDeleteChat
 * @apiGroup Chats
 *
 * @apiHeader {String} Authorization User token
 * @apiParam {Number} chat_id Chat id
 *
 * @apiSuccess {String} message Chat deleted
 */
router.delete('/chats/:chat_id/', deleteChat);

/**
 * @api {get} /me Get current user
 * @apiName GetMe
 * @apiGroup Users
 *
 * @apiHeader {String} Authorization User token
 *
 * @apiSuccess {Object} user User object
 */
router.get('/me', getMyself);

/**
 * @api {get} /users/:user_id Get user by id
 * @apiName GetUser
 * @apiGroup Users
 *
 * @apiParam {Number} user_id User id
 *
 * @apiSuccess {Object} user User object
 */
router.get('/users/:user_id', getUser);

/**
 * @api {get} /chats/:chat_id/invite Get invite token
 * @apiName GetAddInvite
 * @apiGroup Chats
 *
 * @apiParam {Number} chat_id Chat id
 *
 * @apiSuccess {String} token Invite token
 */
router.get('/chats/:chat_id/invite', addInvite);

/**
 * @api {delete} /chats/:chat_id/invite Delete invite token
 * @apiName DeleteDeleteInvite
 * @apiGroup Chats
 *
 * @apiParam {Number} chat_id Chat id
 *
 * @apiSuccess {String} message Invite deleted
 */
router.delete('/chats/:chat_id/invite', deleteInvite);

/**
 * @api {get} /chats/:chat_id/invites Get all invites for chat
 * @apiName GetUserInvites
 * @apiGroup Chats
 *
 * @apiParam {Number} chat_id Chat id
 *
 * @apiSuccess {Object[]} invites Array of invites
 */
router.get('/chats/:chat_id/invites', getUserInvites);

/**
 * @api {post} /chats/:chat_id/rename Rename chat
 * @apiName PostRenameChat
 * @apiGroup Chats
 *
 * @apiHeader {String} Authorization User token
 * @apiParam {Number} chat_id Chat id
 * @apiParam {String} name New chat name
 *
 * @apiSuccess {String} message Chat renamed
 */
router.post('/chats/:chat_id/rename', renameChat);

router.post('/chats/:chat_id/kick', kickUser);

router.post('/chats/:chat_id/ban', banUser);

router.post('/chats/:chat_id/unban', unbanUser);

router.get('/chats/:chat_id/banned', getBannedUsers);


export default router