import { Request, Response } from 'express'
import { loginUser } from '../services/auth.services'
import getErrorMessage from '../utils/get-error-message'
import UserI from '../interfaces/user.interface'

const AuthControllers = {
  loginUser: async (req: Request, res: Response) => {
    try {
      const { document, password } = req.body
      if (!document || !password)
        return res.status(404).json({ ok: false, message: 'Missing Data' })
      const userData = await loginUser(document, password) as unknown as UserI
      if (userData) return res.status(200).header('Auth', userData.id).json({...userData })
      else throw { status: 404, msg: 'Invalid Credentials' }
    } catch (error) {
      res.status(500).json({ ok: false, message: 'Internal server error', error: getErrorMessage(error) })
    }
  },
}

export default AuthControllers
