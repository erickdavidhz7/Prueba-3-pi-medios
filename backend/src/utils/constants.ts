import dotenv from 'dotenv'
import {get} from 'env-var'
import { CorsOptions } from 'cors'
dotenv.config()

export const corsOptions : CorsOptions = {
  origin: '*',
  credentials: true,
  allowedHeaders: ['Origin, X-Requested-With, Content-Type, Accept'],
  methods: ['GET, POST, OPTIONS, PUT, DELETE, PATCH'],
}

export const envs = {
  APP_DOMAIN: get('APP_DOMAIN').default('localhost').asString(),
  PORT: get('PORT').required().asPortNumber()
}
