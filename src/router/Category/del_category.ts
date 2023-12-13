import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Category } from '../..';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.delete('/api/category/:id', async (req, res) => {
    try {
      const categoryId = req.params.id;
      const categoryById = await Category.findByPk(categoryId);
      if (categoryById) {
        await categoryById.destroy()
      }
      res.status(200).json({ message: 'La catégorie a été supprimé' });
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie par ID :', error);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  });