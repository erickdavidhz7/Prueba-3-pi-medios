import { Request, Response } from 'express'
import saleServices from '../services/sale.services'
import SaleI from '../interfaces/sale.interface'
import getErrorMessage from '../utils/get-error-message'
import getMonthAndYearFromDate from '../utils/get-month-year'

const SaleControllers = {
  createSale: async (req: Request, res: Response) => {
    try {
      const saleData = req.body as unknown as SaleI
      const newSale = await saleServices.createSale(saleData)
      res.status(201).json(newSale)
    } catch (error) {
      res.status(500).json({ ok: false, message: 'Internal server error', error: getErrorMessage(error) })
    }
  },
  getAllSales: async (req: Request, res: Response) => {
    try {
      const sales = await saleServices.getAllSales()
      if (sales.length > 0) res.status(200).json(sales)
      else
        res
          .status(400)
          .json({ ok: false, message: 'There are no sales in the database' })
    } catch (error) {
      res.status(500).json({ ok: false, message: 'Internal server error', error: getErrorMessage(error) })
    }
  },
  findSaleById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const sale = await saleServices.findSaleById(id)
      if (sale) res.status(200).json(sale)
      else
        res.status(400).json({
          ok: false,
          message: 'There are no sales with this id in the database',
        })
    } catch (error) {
      res.status(500).json({ ok: false, message: 'Internal server error', error: getErrorMessage(error) })
    }
  },
  updateSale: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const data = req.body
      const saleToUpdate = await saleServices.updateSale(id, data)
      res.status(200).json(saleToUpdate)
    } catch (error) {
      res.status(500).json({ ok: false, message: 'Internal server error', error: getErrorMessage(error) })
    }
  },
  deleteSale: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      await saleServices.deleteSale(id)
      res.status(200).json({ok: true, message: "Sale has been deleted"})
    } catch (error) {
      res.status(500).json({ ok: false, message: 'Internal server error', error: getErrorMessage(error) })
    }
  },
  getTotalSalesOfDay : async (req: Request, res: Response) => {
    try {
      const { date } = req.query 
      if(!date) res.status(400).send('Date query parameter is required')
      const sales = await saleServices.getAllSalesOfDay(date) as unknown as SaleI[]
      const totalSales = await saleServices.getTotalSales(sales)
      res.status(200).json({ok: true, message: `Total sales of ${date} are: ${totalSales}`})
    } catch (error) {
      res.status(500).json({ ok: false, message: 'Internal server error', error: getErrorMessage(error) })
    }
  },
  getTotalSalesOfMonth : async(req: Request, res: Response) => {
    try {
      const { date } = req.query
      const {month, year} = getMonthAndYearFromDate(date as string)
      if(!date) res.status(400).send('Date query parameter is required')
      const sales = await saleServices.getAllSalesOfMonth(date) as unknown as SaleI[]
      const totalSales = await saleServices.getTotalSales(sales)
      res.status(200).json({ok: true, message: `Total sales of ${month} ${year} are: ${totalSales}`})
    } catch (error) {
      res.status(500).json({ ok: false, message: 'Internal server error', error: getErrorMessage(error) })
    }
  }
}
export default SaleControllers
