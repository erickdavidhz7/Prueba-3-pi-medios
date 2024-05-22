import { Products } from '../models/product.model'
import { Roles } from '../models/role.model'
import { promises as fs } from 'fs'
import path from 'path'
import { rolesArray } from './constants'

export const preloadDataProducts = async () => {
  try {
    const dataPath = path.join(__dirname, 'products.json')
    const jsonData = await fs.readFile(dataPath, 'utf-8')
    const products = JSON.parse(jsonData)

    const validateBulk = await Products.findOne({
      where: { id: products[0].id },
    })
    if (validateBulk) {
      console.log('Data of products is already inside the database')
      return
    }
    await Products.bulkCreate(products)
    console.log('Database has loaded the data of products succesfully')
  } catch (error) {
    console.log('Data of products is already inside the database')
  }
}

export const preloadDataRoles = async () => {
  try {
    const validateBulk = await Roles.findOne({
      where: { id: rolesArray[0].id },
    })

    if (validateBulk) {
      console.log('Data of roles is already inside the database')
      return
    }

    await Roles.bulkCreate(rolesArray)
    console.log('Database has loaded the data of roles succesfully')
  } catch (error) {
    console.log('Data of roles is already inside the database')
  }
}
