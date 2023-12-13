import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Category } from '../..';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/api/category', async (req: Request, res: Response) => {
    try {
      const category = await Category.findAll();
      res.json(category);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories :', error);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  });

  app.get('/api/category/:id', async (req: Request, res: Response) => {
    try {
      const categoryId = req.params.id;
      const categoryById = await Category.findByPk(categoryId);
      res.json(categoryById);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories :', error);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  });