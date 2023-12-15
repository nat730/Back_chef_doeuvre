import { Request, Response, Router } from 'express';
import { Product, Category } from "../..";

export const updproductRouter = Router();

updproductRouter.put('/api/product/:id', async (req: Request, res: Response) => {
  try {
    const { name, description, price, priceperkg, priceasso, priceperkgasso, stock_quantity, category } = req.body;
    const productId = req.params.id;

    const productById = await Product.findByPk(productId);

    if (!productById) {
      return res.status(404).json({ error: 'Produit non trouvé.' });
    }

    const categoryExists = await Category.findOne({ where: { name: category } });

    if (!categoryExists) {
      return res.status(404).json({ error: 'La catégorie spécifiée n\'existe pas.' });
    }

    await productById.update({
      name,
      description,
      price,
      priceperkg,
      priceasso,
      priceperkgasso,
      stock_quantity,
      category,
    });

    res.status(200).json({ message: 'Le produit a été modifié' });
  } catch (error) {
    console.error('Erreur lors de la modification du produit par ID :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});