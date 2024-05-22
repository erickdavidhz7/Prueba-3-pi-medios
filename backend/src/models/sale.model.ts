import { DataTypes } from 'sequelize'
import { db } from '../utils/database'

export const Sales = db.define(
  'sales',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    qty: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    sale_at: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    products_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
    },
    users_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
  }
)
