import bodyParser from 'body-parser';
import express, { Router, type Express } from 'express'

interface CustomExpress extends Express {
  postgres?: any
}

const PORT = process.env.NODE_ENV === 'production' ? (Number(process.env.PORT) || 8080) : 9999;
const app: CustomExpress = express();
const apiRouter = Router();

app.use(bodyParser.json())
app.use('/api', apiRouter)

apiRouter.get('/', (req, res, _) => {
  res.status(200).send(`<h1>Servidor rodando na porta ${PORT}</h1>`)
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
