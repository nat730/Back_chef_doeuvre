import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Category } from '../..';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/api/category', async (req: Request, res: Response) => {
    try {
      const { name, description } = req.body;
      const newCategory = await Category.create({ name, description });
      res.json(newCategory);
    } catch (error) {
      console.error('Erreur lors de la création d\'une catégorie :', error);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  });