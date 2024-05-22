import express from 'express'
import RoleControllers from '../controllers/role.controller'
import { tokenValidator, checkAdminRole } from '../middlewares/auth.middlewares'

const router = express.Router()

router.post('/', [checkAdminRole, tokenValidator], RoleControllers.CreateRole)

export default router
