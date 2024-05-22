import UserI from '../interfaces/user.interface'
import { Users } from '../models/user.model'
import { RolesId } from '../utils/constants'
import { hashPassword } from '../utils/crypto'

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
      console.log(error)
      throw new Error('Unable to create user')
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
      const userId = await Users.findOne({
        where: {
          document,
        },
      })
      return userId
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
      throw new Error('Error updating the user')
    }
  },
  changeUserRole: async (id: string, role: string) => {
    try {
      const roleMapping: { [key: string]: string } = {
        admin: RolesId.admin,
        employee: RolesId.employee,
        everyone: RolesId.everyone,
      }

      const userToUpdate = await Users.findByPk(id)
      if (!userToUpdate) {
        throw new Error('Error searching the user')
      }

      const newRole = roleMapping[role]
      console.log(newRole)
      if (!newRole) {
        throw new Error('Invalid role')
      }

      userToUpdate.update({ roles_id: newRole })
      return userToUpdate
    } catch (error) {
      throw new Error(`Error changing the user's role`)
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
      throw new Error(`Error trying to delete the user`)
    }
  },
}

export default userServices
