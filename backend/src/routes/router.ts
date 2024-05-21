import express, { Request, Response} from 'express'
import usersRoutes from './user.routes'
import authRoutes from './auth.routes'

const mainRouter = express.Router();

mainRouter.get('/', (_req: Request, res: Response) => {
  res.status(200).send(`
  <h1>Welcome to Daniela's store backend server</h1>
  <h2>Code: 200</h2>
  <p>Good request</p>
  <p>Using HTTP</p>
  <P>Architecture Defined</p>
 `)
})

mainRouter.use('/auth', authRoutes)
mainRouter.use('/users', usersRoutes)

export default mainRouter