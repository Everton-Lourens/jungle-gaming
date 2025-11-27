import express from 'express'
import { RegisterController } from '../controllers/RegisterController.js'

const registerRoutes = express.Router()

const userController = new RegisterController()

registerRoutes.post('/', userController.createNewUser.bind(userController))

registerRoutes.post('/', (req, res, _) => {
    res.status(200).send(`<h1>Servidor acessando o endpoint /register!</h1>`)
})

export { registerRoutes }





