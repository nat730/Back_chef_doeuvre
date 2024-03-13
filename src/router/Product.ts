import { Request, Response, Router } from "express";
import { Product, Category } from "..";
import authenticationMiddleware from "../middleware/middleware_jws";

export const productRouter = Router();

// Create a new product
productRouter.post("/", async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      price,
      priceperkg,
      priceasso,
      priceperkgasso,
      stock_quantity,
      category_id,
    } = req.body;

    // Validation des données
    if (!name || !description || !price || !stock_quantity || !category_id) {
      return res
        .status(400)
        .json({
          error:
            "Veuillez fournir toutes les informations nécessaires pour créer un produit.",
        });
    }

    // Vérification de l'existence de la catégorie
    const categoryExists = await Category.findOne({
      where: { id: category_id },
    });

    if (!categoryExists) {
      return res
        .status(404)
        .json({ error: "La catégorie spécifiée n'existe pas." });
    }

    const categoryName = categoryExists.dataValues.name;

    // Création d'un nouveau produit
    const newProduct = await Product.create({
      name,
      description,
      price,
      priceperkg,
      priceasso,
      priceperkgasso,
      stock_quantity,
      category_id,
    });

    // Réponse avec le nouveau produit créé
    res.status(201).json({ newProduct, categoryName });
  } catch (error) {
    console.error("Erreur lors de la création d'un produit :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

// Get all products
productRouter.get("/", async (req, res) => {
  try {
    // Récupérer tous les produits avec les détails de la catégorie
    const productsWithCategory = await Product.findAll({
      include: [{ model: Category }],
    });

    // Transformez les données pour remplacer l'ID par le nom de la catégorie
    const transformedProducts = productsWithCategory.map((Product) => ({
      id: Product.dataValues.id,
      name: Product.dataValues.name,
      description: Product.dataValues.description,
      price: Product.dataValues.price,
      priceperkg: Product.dataValues.priceperkg,
      priceasso: Product.dataValues.priceasso,
      priceperkgasso: Product.dataValues.priceperkgasso,
      stock_quantity: Product.dataValues.stock_quantity,
      categoryName: Product.dataValues.category.name,
    }));

    res.json(transformedProducts);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

// Get a specific product by ID
productRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const productById = await Product.findByPk(productId);

    if (!productById) {
      return res.status(404).json({ error: "Produit non trouvé." });
    }

    res.json(productById);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

// Update a product by ID
productRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      price,
      priceperkg,
      priceasso,
      priceperkgasso,
      stock_quantity,
      FKcategory,
    } = req.body;
    const productId = req.params.id;

    const productById = await Product.findByPk(productId);

    if (!productById) {
      return res.status(404).json({ error: "Produit non trouvé." });
    }

    const categoryExists = await Category.findOne({
      where: { name: FKcategory },
    });

    if (!categoryExists) {
      return res
        .status(404)
        .json({ error: "La catégorie spécifiée n'existe pas." });
    }

    await productById.update({
      name,
      description,
      price,
      priceperkg,
      priceasso,
      priceperkgasso,
      stock_quantity,
      FKcategory,
    });

    res.status(200).json({ message: "Le produit a été modifié" });
  } catch (error) {
    console.error("Erreur lors de la modification du produit par ID :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});
