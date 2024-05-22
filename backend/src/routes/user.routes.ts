import UsersControllers from "../controllers/user.controllers";
import express from "express";
import { checkAdminRole } from '../middlewares/auth.middlewares'

const router = express.Router()

router.get('/', [checkAdminRole], UsersControllers.getAllUsers)
router.get('/:document', UsersControllers.findUserByDocument)
router.patch('/:id', UsersControllers.updateUser)
router.patch('/role/:id', [checkAdminRole], UsersControllers.changeUserRole)
router.delete('/:id', [checkAdminRole], UsersControllers.deleteUser)

export default router