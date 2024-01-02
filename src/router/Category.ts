import { Request, Response, Router } from 'express';
import { Category } from '..';
import authenticationMiddleware from '../middleware/middleware_jws';

export const categoryRouter = Router();

categoryRouter.post('/', authenticationMiddleware, async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const newCategory = await Category.create({ name, description });
    res.json(newCategory);
  } catch (error) {
    console.error('Erreur lors de la création d\'une catégorie :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

categoryRouter.delete('/:id', authenticationMiddleware, async (req, res) => {
  try {
    const categoryId = req.params.id;
    //@ts-ignore
    const categoryById = await Category.findById(categoryId);
    if (categoryById) {
      await categoryById.destroy();
    }
    res.status(200).json({ message: 'La catégorie a été supprimé' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la catégorie par ID :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

categoryRouter.get('/', async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

categoryRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;
    //@ts-ignore
    const categoryById = await Category.findById(categoryId);
    res.json(categoryById);
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

categoryRouter.put('/:id', authenticationMiddleware, async (req, res) => {
  try {
    const { name, description } = req.body;
    const categoryId = req.params.id;
    //@ts-ignore
    const categoryById = await Category.findById(categoryId);
    if (categoryById) {
      await categoryById.update({ name, description });
      res.status(200).json({ message: 'Le category a été modifié' });
    } else {
      // Handle the case where the category is not found
      res.status(404).json({ error: 'La catégorie n\'a pas été trouvée' });
    }
  } catch (error) {
    console.error('Erreur lors de la modification de la catégorie par ID :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});
