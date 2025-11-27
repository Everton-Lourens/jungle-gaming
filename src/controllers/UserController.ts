import type { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid';
import { findById, insertPerson, existsByApelido, count, findByTerm } from '../database/index.js';
import { logger } from '../helpers/logger.js';

export class UserController {
    async createNewUser(req: Request, res: Response): Promise<Response> {
        const id: string = uuidv4();
        return insertPerson(id, req.body).then(() => {
            logger.info(`/user/${id}`);
            res.status(201).location(`/user/${id}`).end();
            return res;
        }).catch(err => {
            res.status(422).end();
            return Promise.reject(err);
        })
    }
    async getUserById(req: Request, res: Response): Promise<Response> {
        const id: string = req.params.id as string;
        return findById(id).then((queryResult) => {
            const [result] = queryResult.rows;
            if (!result) {
                return res.status(404).end();
            }
            return res.json(result).end();
        }).catch(() => {
            return res.status(500).end();
        })
    }

    async findTerm(req: Request, res: Response): Promise<Response> {
        if (!req.query['t']) {
            return res.status(400).end();
        }
        try {
            const queryResults = await findByTerm(req.query.t as string);
            return res.json(queryResults.rows);
        } catch {
            return res.status(404).end();
        }
    }



}
