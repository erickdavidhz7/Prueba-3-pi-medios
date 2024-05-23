import express from 'express'
import SeedControllers from '../controllers/seed.controller'

const router = express.Router()

router.get('/', SeedControllers.seed)

export default router