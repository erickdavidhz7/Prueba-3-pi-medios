import { Roles } from "./role.model"
import { Users } from "./user.model"


export const initModels = () => {
  Roles.hasMany(Users, {foreignKey: 'roles_id', sourceKey: 'id'})
}