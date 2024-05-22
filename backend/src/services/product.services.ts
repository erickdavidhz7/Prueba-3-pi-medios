import ProductI from '../interfaces/product.interface'
import { Products } from '../models/product.model'

const productServices = {
  createProduct: async (product: ProductI) => {
    try {
      if (!product.description || !product.name || !product.price)
        throw new Error('Missing Data')
      const newProduct = await Products.create({
        description: product.description,
        name: product.name,
        price: product.price,
      })
      return newProduct
    } catch (error) {
      throw error
    }
  },
  getAllProducts: async () => {
    try {
      const allProducts = await Products.findAll()
      return allProducts
    } catch (error) {
      throw error
    }
  },
  getProductById: async (id: string) => {
    try {
      if (!id) throw new Error('Error searching the product')
      const product = await Products.findOne({ where: { id } })
      return product
    } catch (error) {
      throw error
    }
  },
  updateProduct: async (id: string, data: Partial<ProductI>) => {
    try {
      const productToUpdate = await Products.findByPk(id)
      if (!productToUpdate) throw new Error('Error searching the product')
      productToUpdate.update(data)
    } catch (error) {
      throw error
    }
  },
  getPrice: async(id: string) => {
    try {
      const product = await Products.findByPk(id) as unknown as ProductI
      const price = product.price
      return price
    } catch (error) {
      throw error
    }
  }
}

export default productServices