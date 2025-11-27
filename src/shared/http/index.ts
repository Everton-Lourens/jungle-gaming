import bodyParser from 'body-parser';
import { routes } from '../../routes/index.js';
import express, { type Express } from 'express'

interface CustomExpress extends Express {
  postgres?: any
}

const PORT = process.env.NODE_ENV === 'production' ? (Number(process.env.PORT) || 8080) : 9999;
const app: CustomExpress = express();

app.use(bodyParser.json())
app.use(routes)


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
