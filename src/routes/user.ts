import express from 'express'
import { UserController } from '../controllers/UserController.js'
import { validateBody } from '../middlewares/validate.js'

const userRoutes = express.Router()

const userController = new UserController()

userRoutes.post('/', validateBody, userController.createNewUser.bind(userController))

userRoutes.get('/:id', userController.getUserById.bind(userController))

userRoutes.get('/exists/:apelido', userController.findTerm.bind(userController))

//userRoutes.get('/count', userController.getCount.bind(userController))

export { userRoutes }





