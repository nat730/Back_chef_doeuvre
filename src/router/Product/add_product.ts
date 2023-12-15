import { Request, Response, Router } from 'express';
import { Product,Category } from "../..";

export const addproductRouter = Router();

addproductRouter.post('/api/product', async (req: Request, res: Response) => {
  try {
    const { name, description, price, priceperkg, priceasso, priceperkgasso, stock_quantity, category } = req.body;
    const categoryExists = await Category.findOne({ where: { name: category } });

    if (!categoryExists) {
      return res.status(404).json({ error: 'La catégorie spécifiée n\'existe pas.' });
    }

    const newProduct = await Product.create({
      name,
      description,
      price,
      priceperkg,
      priceasso,
      priceperkgasso,
      stock_quantity,
      category,
    });

    res.json(newProduct);
  } catch (error) {
    console.error('Erreur lors de la création d\'un produit :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});