import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Customer } from '..';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/api/auth/local', async (req: Request, res: Response) => {
    try {
      const { identifier, password } = req.body;
      const user = await Customer.findOne({ where: { username: identifier } });
      if (!user) {
        return res.status(401).json({ error: 'Identifiants invalides' });
      }
      //@ts-ignore
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Identifiants invalides' });
      }
            //@ts-ignore
      const jwtToken = jwt.sign({uuid: uuidv4(), userId: user.id },'secret',{ expiresIn: '1h' });
          res.status(200).json({ message: 'Connexion réussie', jwtToken });
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      res.status(500).json({ message: 'Erreur interne du serveur', error: error });
    }
  });