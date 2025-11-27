import type { Request, Response } from 'express'

export class RegisterController {
  async createNewUser(req: Request, res: Response): Promise<void> {
    res.status(200).send(`<h1>Servidor acessando o endpoint /createNewUser!</h1>`)
 
  }
}