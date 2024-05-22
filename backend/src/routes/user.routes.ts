import UsersControllers from "../controllers/user.controllers";
import express from "express";
import { checkAdminRole, tokenValidator } from '../middlewares/auth.middlewares'

const router = express.Router()

router.get('/', [checkAdminRole, tokenValidator], UsersControllers.getAllUsers)
router.get('/:document', [tokenValidator], UsersControllers.findUserByDocument)
router.patch('/:id', [tokenValidator], UsersControllers.updateUser)
router.patch('/role/:id', [checkAdminRole, tokenValidator], UsersControllers.changeUserRole)
router.delete('/:id', [checkAdminRole, tokenValidator], UsersControllers.deleteUser)

export default router