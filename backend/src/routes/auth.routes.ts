import express from 'express'
import UsersControllers from '../controllers/user.controllers'
import AuthControllers from '../controllers/auth.controllers'
import { uniqueDocumentValidator, tokenValidator, checkAdminRole } from '../middlewares/auth.middlewares'
const router = express.Router()

router.post('/login', AuthControllers.loginUser)
router.post('/register', [checkAdminRole, tokenValidator, uniqueDocumentValidator], UsersControllers.createUser)

export default router