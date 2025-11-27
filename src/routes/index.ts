import { Router } from 'express'
import { userRoutes } from './register.js'

const routes = Router()

routes.use('/register', userRoutes)

export { routes }