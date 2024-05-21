import express from 'express'
import cors from 'cors'
import http from 'node:http'
import routes from './routes/router'
import { corsOptions, envs } from './utils/constants'
import { initDb } from './utils/database'
import { initModels } from './models/initModels'
import { preloadDataProducts, preloadDataRoles} from './utils/preloadData'

const app = express()

app.use(express.json())
app.use(cors(corsOptions))

initDb()
initModels()
preloadDataProducts()
preloadDataRoles()

app.use('/', routes)

http.createServer(app).listen(envs.PORT, () => {
  console.log(`Server is listening at http://${envs.APP_DOMAIN}:${envs.PORT}/`)
})
