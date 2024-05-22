import userServices from '../services/users.services'
import { Request, Response } from 'express'
import { signToken } from '../utils/jwt.util'
import UserI from '../interfaces/user.interface'
import getErrorMessage from '../utils/get-error-message'

const UsersControllers = {
  createUser: async (req: Request, res: Response) => {
    try {
      const userData = req.body
      const newUser = (await userServices.createUsers(
        userData
      )) as unknown as UserI
      if (!newUser.id)
        return res
          .status(500)
          .json({ ok: false, message: 'Internal server error' })
      const payload = { document: newUser.document, id: newUser.id }
      return res
        .status(201)
        .json({
          document: newUser.document,
          id: newUser.id,
          last_name: newUser.last_name,
          name: newUser.name,
          token: signToken(payload),
        })
    } catch (error: any) {
      res.status(500).json({ ok: false, message: 'Internal server error', error: getErrorMessage(error) })
    }
  },
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const users = await userServices.getAllUsers()
      if (users.length > 0) res.status(200).json(users)
      else
        res
          .status(400)
          .json({ ok: false, message: 'There are no users in the database' })
    } catch (error: any) {
      res.status(500).json({ ok: false, message: 'Internal server error', error: getErrorMessage(error) })
    }
  },
  findUserByDocument: async (req: Request, res: Response) => {
    try {
      const { document } = req.params
      const user = await userServices.findUserByDocument(document)
      if (user) res.status(200).json(user)
      else
        res.status(400).json({
          ok: false,
          message: 'There are no users with this document in the database',
        })
    } catch (error: any) {
      res.status(500).json({ ok: false, message: 'Internal server error', error: getErrorMessage(error) })
    }
  },
  changeUserRole: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const data = req.body.role
      const userToUpdate = await userServices.changeUserRole(id, data)
      res.status(200).json(userToUpdate)
    } catch (error: any) {
      res.status(500).json({ ok: false, message: 'Internal server error', error: getErrorMessage(error) })
    }
  },
  updateUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const data = req.body
      const userToUpdate = await userServices.updateUser(id, data)
      res.status(200).json(userToUpdate)
    } catch (error: any) {
      res.status(500).json({ ok: false, message: 'Internal server error', error: getErrorMessage(error) })
    }
  },
  deleteUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const userToDelete = await userServices.deleteUser(id)
      res.status(200).json({ok: true, message: "User has been deleted"})
    } catch (error: any) {
      res.status(500).json({ ok: false, message: 'Internal server error', error: getErrorMessage(error) })
    }
  },
}
export default UsersControllers
