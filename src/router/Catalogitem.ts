import { Request, Response, Router } from "express";
import { CatalogItem } from "..";
import adminMiddleware from "../middleware/middleware_admin";
import { Product } from "..";
import authenticationMiddleware from "../middleware/middleware_connexion";

export const catalogItemRouter = Router();

catalogItemRouter.post("/" ,authenticationMiddleware,adminMiddleware, async (req: Request, res: Response) => {
  try {
    const { price_by_unity, price_by_unity_asso, image, product } = req.body;

    if (!price_by_unity || !price_by_unity_asso || !image || !product) {
      return res
        .status(400)
        .json({
          error: "Veuillez fournir toutes les informations nécessaires.",
        });
    }

    const productItem = await Product.findOne({ where: { name: product } });

    if (!productItem) {
        return res.status(404).json({ [`Le produit '${product}'`]: "n'existe pas" });
      }

    const newCatalogItem = await CatalogItem.create({
      price_by_unity: parseFloat(price_by_unity),
      price_by_unity_asso: parseFloat(price_by_unity_asso),
      image,
      product_id: productItem.id,
    });

    res.json(newCatalogItem);
  } catch (error) {
    console.error("Erreur lors de la création du catalogue :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});
