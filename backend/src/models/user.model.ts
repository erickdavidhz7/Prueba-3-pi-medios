import { DataTypes } from 'sequelize'
import { db } from '../utils/database'

export const Users = db.define('users', {
  document: {
    type: DataTypes.STRING(20),
    allowNull: false,
    field: 'document',
  },
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  last_Name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'last_name',
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
    field: 'first_name',
  }
})
