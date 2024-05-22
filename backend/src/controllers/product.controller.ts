import { Request, Response } from 'express'
import productServices from "../services/product.services";
import ProductI from "../interfaces/product.interface";
import getErrorMessage from '../utils/get-error-message'

const ProductControllers = {
  createProduct: async (req: Request, res: Response) => {
    try {
      const productData = req.body as unknown as ProductI
      const newProduct = productServices.createProduct(productData)
      res.status(201).json(newProduct)
    } catch (error) {
      res.status(500).json({ ok: false, message: 'Internal server error', error: getErrorMessage(error) })
    }
  },
  getAllProducts: async(req: Request, res: Response) => {
    try {
      const products = await productServices.getAllProducts()
      if (products.length > 0) res.status(200).json(products)
        else
          res
            .status(400)
            .json({ ok: false, message: 'There are no products in the database' })
    } catch (error) {
      res.status(500).json({ ok: false, message: 'Internal server error', error: getErrorMessage(error) })
    }
  },
  getProductById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const product = await productServices.getProductById(id)
      if (product) res.status(200).json(product)
        else
      res.status(400).json({
        ok: false,
        message: 'There are no products with this id in the database',
      })
    } catch (error) {
      res.status(500).json({ ok: false, message: 'Internal server error', error: getErrorMessage(error) })
    }
  },
  updateProduct: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const data = req.body
      const productToUpdate = await productServices.updateProduct(id, data)
      res.status(200).json(productToUpdate)
    } catch (error) {
      res.status(500).json({ ok: false, message: 'Internal server error', error: getErrorMessage(error) })
    }
  }
}