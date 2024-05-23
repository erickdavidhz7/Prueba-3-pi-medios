import express from 'express'
import cors from 'cors'
import http from 'node:http'
import swaggerUi from 'swagger-ui-express'
import routes from './routes/router'
import { corsOptions, envs } from './utils/constants'
import { initDb } from './utils/database'
import { initModels } from './models/initModels'
import openApiSpec from '../openapiDoc/openapi.json'
import preLoadData from './utils/preloadData'

const app = express()

app.use(express.json())
app.use(cors(corsOptions))

initDb()
initModels()
// there is a bug that sometimes it doesn't preload the data from the json to the database
// when that happens the best is to restart the server or use seed
preLoadData.preloadDataProducts()

app.use('/', routes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpec))

http.createServer(app).listen(envs.PORT, () => {
  console.log(`Server is listening at http://${envs.APP_DOMAIN}:${envs.PORT}/`)
})
