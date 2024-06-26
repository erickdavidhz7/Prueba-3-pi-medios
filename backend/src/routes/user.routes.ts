import UserControllers from "../controllers/user.controllers";
import express from "express";
import { checkAdminRole, tokenValidator } from '../middlewares/auth.middlewares'

const router = express.Router()

router.get('/', [checkAdminRole], UserControllers.getAllUsers)
router.get('/:document', [tokenValidator], UserControllers.findUserByDocument)
router.patch('/:id', [tokenValidator], UserControllers.updateUser)
router.delete('/:id', [checkAdminRole], UserControllers.deleteUser)

export default router