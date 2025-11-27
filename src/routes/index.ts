import { Router } from 'express'
import { registerRoutes } from './register.js'

const routes = Router()

routes.use('/register', registerRoutes)

export { routes }