import express from 'express'
import RoleControllers from '../controllers/role.controller'
import UsersControllers from '../controllers/user.controllers'
import { tokenValidator, checkAdminRole } from '../middlewares/auth.middlewares'

const router = express.Router()

router.post('/', [checkAdminRole, tokenValidator], RoleControllers.CreateRole)
router.patch('/:id', [checkAdminRole], UsersControllers.changeUserRole)

export default router
