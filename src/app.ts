import  'reflect-metadata'
import express, { json } from 'express'
import user from './routes/user'
import task from './routes/task'
import Connection from './config/databaseConnection'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swagger.json'

Connection.create()
const app = express()

app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDocs))
app.use(json())
app.use(user)
app.use(task)

export default app