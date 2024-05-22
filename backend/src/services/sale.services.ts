import SaleI from '../interfaces/sale.interface'
import { Sales } from '../models/sale.model'

const saleServices = {
  createSale: async (sale: SaleI) => {
    try {
      if (!sale.qty || !sale.products_id || !sale.users_id) {
        throw new Error('Missing Data')
      }
      const date = new Date()
      const newSale = await Sales.create({
        products_id : sale.products_id,
        qty: sale.qty,
        sale_at: date.toLocaleString(),
        users_id : sale.users_id
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
}

export default saleServices
