import { Request, Response, Router } from 'express';
import { Customer } from '../..';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export const logincustomerRouter = Router();

logincustomerRouter.post('/api/auth/local', async (req: Request, res: Response) => {
    try {
      const { identifier, password } = req.body;
      const user = await Customer.findOne({ where: { mail: identifier } });
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