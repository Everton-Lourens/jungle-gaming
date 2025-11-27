import express from 'express'
import { UserController } from '../controllers/UserController.js'
import { validateBody } from '../middlewares/validate.js'

const userRoutes = express.Router()

const userController = new UserController()

userRoutes.get('/', validateBody, userController.createNewUser.bind(userController))

userRoutes.post('/', (req, res, _) => {
    res.status(200).send(`<h1>Servidor acessando o endpoint /register!</h1>`)
})

export { userRoutes }





