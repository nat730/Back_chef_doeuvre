import { Request, Response, Router } from "express";
import { Product, Category, CatalogItem } from "..";
import authenticationMiddleware from "../middleware/middleware_connexion";
import adminMiddleware from "../middleware/middleware_admin";

export const productCatalogItemRouter = Router();

// Create a new product
productCatalogItemRouter.post("/", authenticationMiddleware, adminMiddleware, async (req: Request, res: Response) => {
    try {
      const { name, description, unit_value, FKcategory, price_by_unity, price_by_unity_asso, image } = req.body;
  
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
  
      // Création d'un nouveau produit
      const newProduct = await Product.create({
        name,
        description,
        unit_value,
        category_id: categoryExists.id
      });
  
      const newCatalogItem = await CatalogItem.create({
        price_by_unity,
        price_by_unity_asso,
        image,
        product_id: newProduct.id
      });
  
      // Réponse avec le nouveau produit créé
      res.status(201).json({ newProduct,newCatalogItem, categoryName: categoryExists.name });
    } catch (error) {
      console.error("Erreur lors de la création d'un produit :", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  });
  
  productCatalogItemRouter.get("/", async (req: Request, res: Response) => {
    try {
      const products = await Product.findAll({
        include: [CatalogItem],
      });
  
      res.status(200).json(products);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  });