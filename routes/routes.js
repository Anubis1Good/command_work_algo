import { Router } from "express";
import { main } from "../controllers/main.js";
import {deleteUser,changePassword,createUser } from "../controllers/userdb.js";
const router = Router()

router.get('/',main)
router.delete('/user/:id',deleteUser)
router.post('/user/:id',createUser)
router.patch('/user/:id',changePassword)
export default router