import SaleI from '../interfaces/sale.interface'
import { Sales } from '../models/sale.model'
import { Op } from 'sequelize'
import productServices from './product.services'
import getTotalPriceWithQty from '../utils/calculate-total-price'

const saleServices = {
  createSale: async (sale: SaleI) => {
    try {
      if (!sale.qty || !sale.products_id || !sale.users_id) {
        throw new Error('Missing Data')
      }
      const date = new Date()
      const newSale = await Sales.create({
        products_id: sale.products_id,
        qty: sale.qty,
        sale_at: date,
        users_id: sale.users_id,
      })
      return newSale
    } catch (error) {
      throw error
    }
  },
  getAllSales: async () => {
    try {
      const sales = await Sales.findAll()
      return sales
    } catch (error) {
      throw new Error('Unable to search sales')
    }
  },
  findSaleById: async (id: string) => {
    try {
      if (!id) throw new Error('Error searching the sale')
      const sale = await Sales.findByPk(id)
      return sale
    } catch (error) {
      throw error
    }
  },
  updateSale: async (id: string, data: Partial<SaleI>) => {
    try {
      const saleToUpdate = await Sales.findByPk(id)
      if (!saleToUpdate) throw new Error('Error searching the sale')
      saleToUpdate.update(data)
      return saleToUpdate
    } catch (error) {
      throw error
    }
  },
  deleteSale: async (id: string) => {
    try {
      const saleToDelete = await Sales.destroy({
        where: { id },
      })
      if (!saleToDelete) throw new Error('Error searching the sale to delete')
      return saleToDelete
    } catch (error) {
      throw error
    }
  },
  getAllSalesOfDay: async (date: string | any) => {
    try {
      if (!date) {
        throw new Error('Missing Data')
      }
      const convertedDate = typeof date === 'string' ? new Date(date) : date
      convertedDate.setHours(0, 0, 0, 0)
      const sales = await Sales.findAll({
        where: {
          sale_at: {
            [Op.eq]: convertedDate,
          },
        },
      })

      return sales
    } catch (error) {
      throw error
    }
  },
  getTotalSales: async (sales: SaleI[]) : Promise<number> => {
    try {
      const pricePromises = sales.map(async (sale) => {
        return await productServices.getPrice(sale.products_id)
      })
      const priceArray = await Promise.all(pricePromises)
      const quantityArray = sales.map((sale) => sale.qty)
      const totalSales = getTotalPriceWithQty(priceArray, quantityArray)
      return totalSales
    } catch (error) {
      throw error
    }
  },
  getAllSalesOfMonth: async (date: string | any) => {
    try {
      if (!date) {
        throw new Error('Missing Data')
      }
      const dateFormatted = new Date(date)
      const year = dateFormatted.getFullYear()
      const month = dateFormatted.getMonth() + 1

      const startDate = new Date(year, month - 1, 1)
      const endDate = new Date(year, month, 0)

      const sales = await Sales.findAll({
        where: {
          sale_at: {
            [Op.between]: [startDate, endDate],
          },
        },
      })
      return sales
    } catch (error) {
      throw error
    }
  }
}

export default saleServices
