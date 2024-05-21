import { DataTypes } from 'sequelize'
import { db } from '../utils/database'

export const Products = db.define('products', {
  description: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
})
