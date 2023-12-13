import express, { Request, Response } from 'express';
import { Customer } from '../..';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcrypt';

const app = express();
const saltRounds = 10;
app.use(bodyParser.json());
app.use(cors());

app.post('/api/auth/local/register', async (req: Request, res: Response) => {
    try {
      const { username, password,firstname,lastname,email,phone,adress } = req.body;
      const existingCustomer = await Customer.findOne({ where: { email } && {username} && {phone}});
      if (existingCustomer) {
        return res.status(409).json({ error: 'Cet utilisateur existe déjà' });
      }
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newCustomer = await Customer.create({
        username,
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