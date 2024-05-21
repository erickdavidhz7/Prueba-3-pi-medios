import express from 'express'
import cors from 'cors'
import http from 'node:http'
import routes from './routes/router'
import { corsOptions, envs } from './utils/constants'


const app = express()

app.use(express.json())
app.use(cors(corsOptions))

app.use('/', routes)

http.createServer(app).listen(envs.PORT, () => {
  console.log(`Server is listening at http://${envs.APP_DOMAIN}:${envs.PORT}/`)
})