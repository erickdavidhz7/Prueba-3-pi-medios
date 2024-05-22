import express from 'express'
import ProductControllers from '../controllers/product.controller'
import {tokenValidator, checkAdminRole } from '../middlewares/auth.middlewares'
const router = express.Router()

router.get('/', ProductControllers.getAllProducts)
router.get('/:id', ProductControllers.getProductById)
router.post('/', [checkAdminRole, tokenValidator], ProductControllers.createProduct)
router.patch('/:id', ProductControllers.updateProduct)

export default router