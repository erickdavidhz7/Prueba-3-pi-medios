import express from 'express'
import RoleControllers from '../controllers/role.controller'
import UsersControllers from '../controllers/user.controllers'
import { checkAdminRole } from '../middlewares/auth.middlewares'

const router = express.Router()

router.get('/', [checkAdminRole], RoleControllers.getAllRoles)
router.post('/', [checkAdminRole], RoleControllers.CreateRole)
router.patch('/:id', [checkAdminRole], UsersControllers.changeUserRole)

export default router
