import userServices from './users.services'
import UserLoginI from '../interfaces/login.interface'
import { comparePassword } from '../utils/crypto'
import { signToken } from '../utils/jwt.util'

export const loginUser = async (document: string, password: string) => {
  try {
    const user = await userServices.findUserByDocument(document)
    if (!user) throw new Error('User not found')

    const userLogin = user as unknown as UserLoginI

    const verifyPassword = comparePassword(password, userLogin.password)

    const token = signToken({
      document: user.dataValues.document,
      id: user.dataValues.id,
    })

    if (verifyPassword) {
      return {
        token,
        document: user.dataValues.document,
        name: user.dataValues.name,
        last_name: user.dataValues.last_name,
        roles_id: user.dataValues.roles_id,
      }
    }
    return false
  } catch (error) {
    throw error
  }
}
