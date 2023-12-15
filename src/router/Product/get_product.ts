import { Request, Response, Router } from 'express';
import { Product } from '../..';

export const getproductRouter = Router();

getproductRouter.get('/api/product', async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});


getproductRouter.get('/api/product/:id', async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const productById = await Product.findByPk(productId);

    if (!productById) {
      return res.status(404).json({ error: 'Produit non trouvé.' });
    }

    res.json(productById);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});