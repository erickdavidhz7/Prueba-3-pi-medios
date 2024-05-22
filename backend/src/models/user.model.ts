import { DataTypes } from 'sequelize'
import { db } from '../utils/database'

export const Users = db.define(
  'users',
  {
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
    last_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      field: 'last_name',
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      field: 'name',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roles_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
  }
)
