import {Router } from 'express';
import { Category } from '../..';

export const updCategoryRouter = Router();

updCategoryRouter.put('/api/category/:id', async (req, res) => {
    try {
      const { name, description } = req.body;
      const gameId = req.params.id;
      const categoryById = await Category.findByPk(gameId);
      if(categoryById){
        await categoryById.update({ name, description })
        res.status(200).json({ message: 'Le category a été modifié' });
      }
      else {
  
      }
    } catch (error) {
      console.error('Erreur lors de la modification de la category par ID :', error);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  })