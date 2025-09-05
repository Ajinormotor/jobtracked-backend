import express from "express"
import { getProfile,updatePassword } from "./user.controller.js"
import protect from "../middleware/auth.middleware.js"

const router = express.Router()


router.get('/me',protect, getProfile)
router.patch('/me',protect, updateProfile)
router.patch('/me/password',protect, updatePassword)

export default router