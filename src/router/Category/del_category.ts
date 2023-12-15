import { Router } from 'express';
import { Category } from '../..';

export const delCategoryRouter = Router();

delCategoryRouter.delete('/api/category/:id', async (req, res) => {
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