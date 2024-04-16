import { Router } from "express";
import { main } from "../controllers/main.js";
import { createUser, loginUser, logoutUser } from "../controllers/users.js";
const router = Router()



router.get('/',main)
router.post('/register',createUser)
router.post('/login',loginUser)
router.delete('/logout',logoutUser)



export default router