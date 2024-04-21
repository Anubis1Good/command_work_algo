import { Router } from "express";
import { main } from "../controllers/main.js";
import { createUser, loginUser, logoutUser, changePassword, deleteUser } from "../controllers/users.js";
import {getChats, createChat, getMembers, joinChat, leaveChat} from "../controllers/chats.js";
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
 * @api {delete} /logout Logout user
 * @apiName DeleteLogout
 * @apiGroup Users
 *
 * @apiHeader {String} Authorization User token
 * 
 * @apiSuccess {String} message Logout success
 */
router.delete('/logout', logoutUser);

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
 * @api {get} /chats Get all chats
 * @apiName GetChats
 * @apiGroup Chats
 *
 * @apiHeader {String} Authorization User token
 * 
 * @apiSuccess {Object[]} chats Array of chats
 */
router.get('/chats', getChats);

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



export default router