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
  PORT: get('PORT').required().asPortNumber(),

  db: {
    DB_HOST: get('DB_HOST').required().asString(),
    DB_USER: get('DB_USER').required().asString(),
    DB_PASSWORD: get('DB_PASSWORD').required().asString(),
    DB_NAME: get('DB_NAME').required().asString(),
    DB_PORT: get('DB_PORT').required().asString(),
  },
}
