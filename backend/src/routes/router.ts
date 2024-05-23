import express, { Request, Response } from 'express'
import usersRoutes from './user.routes'
import authRoutes from './auth.routes'
import roleRoutes from './role.routes'
import productRoutes from './product.routes'
import saleRoutes from './sale.routes'
import seedRoutes from './seed.routes'

const mainRouter = express.Router()

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
mainRouter.use('/roles', roleRoutes)
mainRouter.use('/products', productRoutes)
mainRouter.use('/sales', saleRoutes)
mainRouter.use('/seed', seedRoutes)

export default mainRouter
