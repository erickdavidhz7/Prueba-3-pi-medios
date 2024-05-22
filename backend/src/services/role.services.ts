import { Roles } from '../models/role.model'
import RoleI from '../interfaces/role.interface'
export const CreateRole = async (role: string) => {
  try {
    const newRole = await Roles.create({
      name: role,
    })
    return newRole
  } catch (error) {
    throw error
  }
}

export const getAllRoles = async () => {
  try {
    const roles = (await Roles.findAll()) as unknown as RoleI[]
    return roles
  } catch (error) {
    throw error
  }
}
