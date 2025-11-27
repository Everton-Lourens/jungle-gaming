import express, { type Express } from 'express'
import { routes } from '../../routes/index.js';

interface CustomExpress extends Express {
  postgres?: any
}

const PORT = process.env.NODE_ENV === 'production' ? (Number(process.env.PORT) || 8080) : 9999;
const app: CustomExpress = express()

app.use(routes);

app.get('/', async (req: any, res: any) => {
  try {
    res.status(200).send(`<h1>Servidor rodando na porta ${PORT}</h1>`)
  } catch (err) {
    res.status(500).send('<h1>Falha ao iniciar o servidor</h1>', err)
  }
})
