import { DataTypes } from 'sequelize'
import { db } from '../utils/database'

export const Roles = db.define('Roles', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false
  }
})
