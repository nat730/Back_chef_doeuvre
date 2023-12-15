import { Request, Response, Router } from 'express';
import { Customer } from '../..';
import bcrypt from 'bcrypt';

export const registercustomerRouter = Router();
const saltRounds = 10;

registercustomerRouter.post('/api/auth/local/register', async (req: Request, res: Response) => {
    try {
      const { password,firstname,lastname,email,phone,adress } = req.body;
      const existingCustomer = await Customer.findOne({ where: { email } && {phone}});
      if (existingCustomer) {
        return res.status(409).json({ error: 'Cet utilisateur existe déjà' });
      }
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newCustomer = await Customer.create({
        password: hashedPassword,
        firstname,
        lastname,
        email,
        phone,
      });
      const result = newCustomer.dataValues
      delete result.password
      res.status(200)
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  });

