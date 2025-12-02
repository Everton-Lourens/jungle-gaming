import express, { type Express } from 'express';
import bodyParser from 'body-parser';

import { routes } from '../../routes/index.js';
import { logger } from '../../helpers/logger.js';
import '../../database/postgres.js'; // inicializa conexão

interface CustomExpress extends Express {
  postgres?: unknown;
}

// Porta: 8080 em produção ou 9999 em dev
const PORT =
  process.env.NODE_ENV === 'production'
    ? Number(process.env.PORT) || 8080
    : 9999;

const app: CustomExpress = express();

// Middlewares
app.use(bodyParser.json());
app.use(routes);

// Inicia servidor
app.listen(PORT, () => {
  logger.info(`🚀 Servidor rodando na porta ${PORT}`);
});
