import type { Request, Response } from 'express';
import { logger } from '../helpers/logger.js';

export const validateBody = (req: Request, _res: Response): boolean => {
    try {
        const { apelido, nome, nascimento, stack } = req?.body?.params

        if (!apelido && typeof apelido !== 'string')
            return false;
        if (!nome && typeof nome !== 'string')
            return false;
        if (!nascimento && typeof nascimento !== 'string')
            return false;
        if (!stack && typeof stack !== 'string')
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
