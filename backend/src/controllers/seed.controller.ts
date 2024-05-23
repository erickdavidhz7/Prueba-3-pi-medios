import getErrorMessage from '../utils/get-error-message'
import preLoadData from '../utils/preloadData'
import { Request, Response } from 'express'

const SeedControllers = {
  seed: async(req: Request, res: Response) => {
    try {
      await preLoadData.preloadDataAdmin()
      await preLoadData.preloadDataRoles()
      await preLoadData.preloadDataProducts()
      return 
    } catch (error) {
      res.status(500).json({ ok: false, message: 'Internal server error', error: getErrorMessage(error) })
    }
  }
}

export default SeedControllers