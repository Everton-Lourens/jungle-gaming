import express from 'express'

const registerRoutes = express.Router()

registerRoutes.get('/', (req, res, _) => {
  res.status(200).send(`<h1>Servidor acessando o endpoint /register!</h1>`)
})

export { registerRoutes }
