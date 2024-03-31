import { Router } from "express";
import { main } from "../controllers/main.js";
import { getUser,delUser,changePassword,createUser } from "../controllers/userdb.js";
const router = Router()

router.get('/',main)
router.get('/user/:id',await getUser)
router.delete('/user/:id',await delUser)
router.post('/user/:id',await createUser)
router.patch('/user/:id',await changePassword)
export default router