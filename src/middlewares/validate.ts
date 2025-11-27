import type { Request, Response } from 'express';

export const errorHandler = (err: any, req: Request, res: Response): void => {
    res.status(err.status || 500).end();
};
