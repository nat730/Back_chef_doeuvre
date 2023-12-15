import { Request, Response, Router } from 'express';
import { Category } from '../..';

export const addCategoryRouter = Router();

addCategoryRouter.post('/api/category', async (req: Request, res: Response) => {
    try {
      const { name, description } = req.body;
      const newCategory = await Category.create({ name, description });
      res.json(newCategory);
    } catch (error) {
      console.error('Erreur lors de la création d\'une catégorie :', error);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  });