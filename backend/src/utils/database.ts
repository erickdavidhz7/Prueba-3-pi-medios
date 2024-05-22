import { Sequelize } from 'sequelize'
import { envs } from './constants'

export const db = new Sequelize({
  dialect: 'sqlite',
  host: envs.db.DB_HOST,
  database: envs.db.DB_NAME,
  storage: 'database.sqlite',
  logging: false,
})

export const initDb = () => {
  db.authenticate()
    .then(() => {
      console.log('Database Authenticated')
    })
    .catch((err) => {
      console.log(err)
    })
  // change alter to true when doing changes to models
  db.sync({ alter: false })
    .then(() => {
      console.log('Database Synced')
    })
    .catch((err) => {
      console.log(err)
    })
}
