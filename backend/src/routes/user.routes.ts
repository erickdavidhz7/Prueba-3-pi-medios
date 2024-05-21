import UsersControllers from "../controllers/user.controller";
import express from "express";

const router = express.Router()

router.get('/', UsersControllers.getAllUsers)
router.get('/:document', UsersControllers.findUserByDocument)
router.patch('/:id', UsersControllers.updateUser)
router.patch('/role/:id', UsersControllers.changeUserRole)
router.delete('/:id', UsersControllers.deleteUser)

export default router