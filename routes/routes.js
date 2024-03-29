import { Router } from "express";
import { main } from "../controllers/main.js";
import { getUser } from "../controllers/userdb.js";
const router = Router()

router.get('/',main)
router.get('/user/:id',await getUser)
export default router