import { Router } from "express";
import { main } from "../controllers/main.js";
import { createUser, loginUser, logoutUser, changePassword, deleteUser } from "../controllers/users.js";
import {getChats, createChat, getMembers, joinChat, leaveChat} from "../controllers/chats.js";
const router = Router()



router.get('/',main)
router.post('/register',createUser)
router.post('/login',loginUser)
router.delete('/logout',logoutUser)
router.patch('/change_password',changePassword)
router.delete('/delete_user',deleteUser)

router.get('/chats',getChats)
router.post('/chats',createChat)
router.get('/chats/:chat_id/members',getMembers)

//TODO: add invite system
router.post('/chats/:chat_id/join',joinChat)
router.post('/chats/:chat_id/leave',leaveChat)

export default router