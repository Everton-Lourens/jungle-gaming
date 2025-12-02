import express from 'express'
import type { Request, Response } from 'express'
import { UserController } from '../controllers/UserController.js'
import { validateBody } from '../middlewares/validate.js'
import path from 'path';

const userRoutes = express.Router()

const userController = new UserController()

userRoutes.post('/', validateBody, userController.createNewUser.bind(userController))

userRoutes.get('/count', userController.getCount.bind(userController))

userRoutes.get('/exists/:apelido', userController.findTerm.bind(userController))

userRoutes.get('/:id', userController.getUserById.bind(userController))

userRoutes.get('/', (req: Request, res: Response) => {
  res.send(`
    <html lang="en" className="scroll-smooth">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Formulário de Usuário</title>
    </head>
    <body>
        <h1>Cadastro de Usuário</h1>
        <form action="/user" method="POST">
            <label for="apelido">Apelido:</label><br>
            <input type="text" id="apelido" name="apelido" required value={(req?.body?.apelido) || ''}><br><br>

            <label for="nome">Nome:</label><br>
            <input type="text" id="nome" name="nome" required value={(req?.body?.nome) || ''}><br><br>

            <label for="nascimento">Nascimento:</label><br>
            <input type="date" id="nascimento" name="nascimento" required value={(req?.body?.nascimento) || ''}><br><br>

            <label for="stack">Stack (separe por vírgula):</label><br>
            <input type="text" id="stack" name="stack" placeholder="node,react,ts" value={(req?.body?.stack) || ''}><br><br>

            <button type="submit">Enviar</button>
        </form>
    </body>
    </html>
    `)
})

export { userRoutes }





