import express from "express";
import userController from "../controller/user.controller";

const router = express.Router()

router.route("/api/users").post(userController.createUser)
router.route("/api/users/:id").put(userController.editUser).get(userController.getAuthor)
router.route("/api/users/softDelete/:id").put(userController.softDelete)
export default router;