import express from 'express'
import SaleControllers from '../controllers/sale.controller'
import {checkAdminRole } from '../middlewares/auth.middlewares'

const router = express.Router()

router.get('/', SaleControllers.getAllSales)
router.get('/:id', [checkAdminRole], SaleControllers.findSaleById)
router.get('/total/day', [checkAdminRole], SaleControllers.getTotalSalesOfDay)
router.get('/total/month', [checkAdminRole], SaleControllers.getTotalSalesOfMonth)
router.post('/', SaleControllers.createSale)
router.patch('/:id', [checkAdminRole], SaleControllers.updateSale)
router.delete('/:id',[checkAdminRole], SaleControllers.deleteSale)

export default router