import { Router } from "express";
import { main } from "../controllers/main.js";
const router = Router()



router.get('/',main)

export default router