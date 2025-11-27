import type { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid';
import { insertPerson } from '../database/index.js';

export class UserController {
    async createNewUser(req: Request, res: Response): Promise<Response> {
            const id: string = uuidv4();
            return insertPerson(id, req.body).then(() => {
                res.status(201).location(`/pessoas/${id}`).end();
                return res;
            }).catch(() => {
                res.status(422).end();
                return res;
            })
    }
}
