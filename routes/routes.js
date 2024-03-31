import { Router } from "express";
import { test } from "../controllers/test.js";

const router = Router()

router.get('/test',test)

export default router