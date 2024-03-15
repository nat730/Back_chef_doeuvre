import { Request, Response, Router } from "express";
import { Product, Category } from "..";
import authenticationMiddleware from "../middleware/middleware_connexion";
import adminMiddleware from "../middleware/middleware_admin";

export const productRouter = Router();

// Create a new product
productRouter.post("/", authenticationMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  try {
    const { name, description, unit_value, FKcategory } = req.body;

    // Validation des données
    if (!name || !description || !unit_value || !FKcategory) {
      console.error(req.body);
      return res.status(400).json({
        error: "Veuillez fournir toutes les informations nécessaires pour créer un produit.",
      });
    }

    // Vérification de l'existence de la catégorie
    const categoryExists = await Category.findOne({ where: { name: FKcategory } });

    if (!categoryExists) {
      return res.status(404).json({ error: "La catégorie spécifiée n'existe pas." });
    }

    const category = await Category.findOne({
      where: { name: FKcategory }
    });

    if (!category) {
      return res.status(404).json({ error: "La catégorie spécifiée n'existe pas." });
    }

    // Création d'un nouveau produit
    const newProduct = await Product.create({
      name,
      description,
      unit_value,
      category_id: category.id
    });

    // Réponse avec le nouveau produit créé
    res.status(201).json({ newProduct, categoryName: categoryExists.name });
  } catch (error) {
    console.error("Erreur lors de la création d'un produit :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});


// Get all products
productRouter.get("/", async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      include: [{
        model: Category,
        attributes: ['name']
      }]
    });

    const productsWithCategoryName = products.map(product => {
      return {
        ...product,
      };
    });
    

    res.json(productsWithCategoryName);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});


// Get a specific product by ID
productRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const productById = await Product.findByPk(productId, {
      include: [{
        model: Category,
        attributes: ['name']
      }]
    });

    if (!productById) {
      return res.status(404).json({ error: "Produit non trouvé." });
    }

    const productWithCategoryName = {
      ...productById,
    };

    res.json(productWithCategoryName);
  } catch (error) {
    console.error("Erreur lors de la récupération du produit :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});
