import { Router } from "express";
import { main } from "../controllers/main.js";
import { createUser, loginUser, logoutUser, changePassword, deleteUser, isAuthenticated } from "../controllers/users.js";
import {getJoinedChats,getChat, createChat, getMembers, joinChat, leaveChat} from "../controllers/chats.js";
import { deleteMessage, getMessages, sendMessage, startMessageESS } from "../controllers/messages.js";
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
router.post('/chats/:chat_id/join', joinChat);

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

router.get("/chats/:chat_id/messages/live", startMessageESS)
export default router