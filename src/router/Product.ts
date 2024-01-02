import { Request, Response, Router } from 'express';
import { Product, Category } from '..';
import authenticationMiddleware from '../middleware/middleware_jws';

export const productRouter = Router();

// Create a new product
productRouter.post('/', authenticationMiddleware, async (req: Request, res: Response) => {
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

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Erreur lors de la création d\'un produit :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// Get all products
productRouter.get('/', async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// Get a specific product by ID
productRouter.get('/:id', async (req: Request, res: Response) => {
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

// Update a product by ID
productRouter.put('/:id', authenticationMiddleware, async (req: Request, res: Response) => {
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
