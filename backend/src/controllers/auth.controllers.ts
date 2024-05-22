import { Request, Response } from 'express'
import { loginUser } from '../services/auth.services'

const AuthControllers = {
  loginUser: async (req: Request, res: Response) => {
    try {
      const { document, password } = req.body
      if (!document || !password)
        return res.status(404).json({ ok: false, message: 'Missing Data' })

      const userData = await loginUser(document, password)

      if (userData) return res.status(200).json({ ok: true, ...userData })
      else throw { status: 404, msg: 'Invalid Credentials' }
    } catch (error: any) {
      res.status(500).json({ ok: false, message: 'Internal server error', error: error.message })
    }
  },
}

export default AuthControllers
