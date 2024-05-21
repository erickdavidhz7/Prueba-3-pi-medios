import { Products } from "./product.model"
import { Roles } from "./role.model"
import { Sales } from "./sale.model"
import { Users } from "./user.model"


export const initModels = () => {
  Roles.hasMany(Users, {foreignKey: 'roles_id', sourceKey: 'id'})
  Users.hasMany(Sales, {foreignKey: 'users_id', sourceKey: 'id'})
  Products.hasMany(Sales, {foreignKey: 'products_id', sourceKey: 'id'})
  
}