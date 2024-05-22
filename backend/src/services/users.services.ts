import RoleI from '../interfaces/role.interface'
import UserI from '../interfaces/user.interface'
import { Users } from '../models/user.model'
import { RolesId } from '../utils/constants'
import { hashPassword } from '../utils/crypto'
import roleServices from './role.services'

const userServices = {
  createUsers: async (user: UserI) => {
    try {
      if (!user.document || !user.last_name || !user.name || !user.password) {
        throw new Error('Missing Data')
      }
      const newUser = await Users.create({
        document: user.document,
        last_name: user.last_name,
        name: user.name,
        password: hashPassword(user.password),
        roles_id: RolesId.everyone,
      })
      return newUser
    } catch (error) {
      throw error
    }
  },
  getAllUsers: async () => {
    try {
      const users = await Users.findAll()
      return users
    } catch (error) {
      throw new Error('Unable to search users')
    }
  },
  findUserByDocument: async (document: string) => {
    try {
      const user = await Users.findOne({
        where: {
          document,
        },
      })
      return user
    } catch (error) {
      throw new Error('Error searching the user')
    }
  },
  updateUser: async (id: string, data: Partial<UserI>) => {
    try {
      const userToUpdate = await Users.findByPk(id)
      if (!userToUpdate) throw new Error('Error searching the user')
      userToUpdate.update(data)
      return userToUpdate
    } catch (error) {
      throw error
    }
  },
  changeUserRole: async (id: string, role: string) => {
    try {
      const userToUpdate = await Users.findByPk(id)
      if (!userToUpdate) {
        throw new Error('Error searching the user')
      }
      const arrayRoles: RoleI[] = await roleServices.getAllRoles()
      const newRole = arrayRoles.find(r => role == r.name)
      if (!newRole) {
        throw new Error('Invalid role')
      }
      userToUpdate.update({ roles_id: newRole.id })
      return userToUpdate
    } catch (error) {
      throw error
    }
  },
  deleteUser: async (id: string) => {
    try {
      const userToDelete = await Users.destroy({
        where: { id },
      })
      if (!userToDelete) throw new Error('Error searching the user to delete')
      return userToDelete
    } catch (error) {
      throw error
    }
  },
  getRoleId : async(id: string) => {
    try {
      const user = await Users.findByPk(id) as unknown as UserI
      if(!user) throw new Error('Error searching the user')
      return user.roles_id
    } catch (error) {
      throw error
    }
  }
}

export default userServices
