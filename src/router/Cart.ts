import { Router } from "express";
import { CatalogItem, Product } from "..";

export const cartRouter = Router();

export interface CartItem {
  name: string;
  quantity: number;
}

interface Cart {
  items: CartItem[];
  totalPrice: number;
}

cartRouter.get("/", async (req, res) => {
  const {items}: {items: CartItem[]} = req.body;
    try {
      const products = await Promise.all(
          items.map(async (item) => {
          return await Product.findAll({
            include: [{
              model: CatalogItem,
            }],
            where: {name: item.name}
          });
        })
      )
        res.json(products);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits du panier :", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  });
