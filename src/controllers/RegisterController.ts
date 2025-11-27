import type { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid';

export class RegisterController {
  async createNewUser(req: Request, res: Response): Promise<void> {
    const id = uuidv4();
    const { apelido, nome, nascimento, stack } = req.body

    res.status(200).send(`<h1>Servidor acessando o endpoint /createNewUser!</h1>`)
 
  }
}