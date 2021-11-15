import express from "express"
import authController from "../controller/auth.controller"

const router = express.Router()

router.route("/auth/signIn").post(authController.signIn)

export default router