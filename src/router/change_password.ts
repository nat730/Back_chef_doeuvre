import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authenticationMiddleware from '../middleware/middleware_jws';
import { Customer } from '..';
import bcrypt from 'bcrypt';


const app = express();
app.use(bodyParser.json());
app.use(cors());


app.put('/api/user/password', authenticationMiddleware, async (req: Request, res: Response) => {
    try {
      const userId = req.body.id;
      const { currentPassword, password,passwordConfirmation } = req.body;
      
      if (password !== passwordConfirmation) {
        return res.status(400).json({ error: 'mot de passee differents' });
      }
      const user = await Customer.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé.' });
      }
      //@ts-ignore
      const passwordMatch = await bcrypt.compare(currentPassword, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Mot de passe actuel incorrect.' });
      }
  
      const hashedNewPassword = await bcrypt.hash(password, 10);
      await user.update({ password: hashedNewPassword });
  
      res.json({ message: 'Mot de passe modifié avec succès.' });
    } catch (error) {
      console.error('Erreur lors de la modification du mot de passe :', error);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  });
  //@ts-ignore
  app.get('/api/user/me', authenticationMiddleware, (req, res) => {
    const userInfo = {
      id: req.body.id,
    };
    res.status(200).json(userInfo);
  });