import express from 'express'
import cors from 'cors'
import http from 'node:http'
import swaggerUi from 'swagger-ui-express'
import routes from './routes/router'
import { corsOptions, envs } from './utils/constants'
import { initDb } from './utils/database'
import { initModels } from './models/initModels'
import preLoadData from './utils/preloadData'
import openApiSpec from '../openapiDoc/openapi.json'

const app = express()

app.use(express.json())
app.use(cors(corsOptions))

initDb()
initModels()
preLoadData.preloadDataAdmin()
preLoadData.preloadDataProducts()
preLoadData.preloadDataRoles()

app.use('/', routes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpec))

http.createServer(app).listen(envs.PORT, () => {
  console.log(`Server is listening at http://${envs.APP_DOMAIN}:${envs.PORT}/`)
})
