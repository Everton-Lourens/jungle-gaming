import type { Request, Response } from 'express';
import { logger } from '../helpers/logger.js';

export const validateBody = (req: Request, _res: Response): boolean => {
    try {
        const client = req?.body?.params

        const requiredFields = ["apelido", "nome", "nascimento", "stack"];
        const missingFields = requiredFields.filter(field => !String(client[field]));

        if (missingFields.length > 0)
            return false;

        const { userId, clientId, message } = client;

        if (!userId && typeof userId !== 'string')
            return false;
        if (!clientId && typeof clientId !== 'string')
            return false;
        if (typeof message !== 'string' || message.trim() === '')
            return false;

        return true
    } catch (error: any) {
        logger.error('Erro de validação');
        logger.error(error.message);
        return false;
    }
};

export const errorHandler = (err: any, req: Request, res: Response): void => {
    res.status(err.status || 500).end();
};
