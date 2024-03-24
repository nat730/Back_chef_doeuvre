import { Router } from "express";
import { CatalogItem, Product } from "..";
import { Sequelize } from "sequelize";

export const cartRouter = Router();

// export interface CartItem {
//   name: string;
//   quantity: number;
// }

// interface Cart {
//   items: CartItem[];
//   totalPrice: number;
// }

export interface IProduct {
  id: number;
  name: string;
  description: string;
  category_id: number;
  unit_value: string;
  created_at: string;
  updated_at: string;
  CatalogItems: ICatalogItem[];
  categoryName: string;
}

interface ICatalogItem {
  id: number;
  price: number;
  price_by_unity_asso: number;
  image: string;
  product_id: number;
  updated_at: string;
  created_at: string;
  catalog_id: number | null;
}

// cartRouter.get("/", async (req, res) => {
//   const {items}: {items: CartItem[]} = req.body;
//     try {
//       const products = await Promise.all(
//           items.map(async (item) => {
//           return await Product.findAll({
//             include: [{
//               model: CatalogItem,
//             }],
//             where: {name: item.name}
//           });
//         })
//       )
//         res.json(products);
//     } catch (error) {
//       console.error("Erreur lors de la récupération des produits du panier :", error);
//       res.status(500).json({ error: "Erreur interne du serveur" });
//     }
//   });

  cartRouter.get('/:value', async (req, res) => {
    const maxValue =  parseFloat(req.params.value)
    let totalPrice = 0;
    const productsAdded = [];

    try {

      while (totalPrice < maxValue) {
        const product = await Product.findOne({
          include: [{
            model: CatalogItem,
          }],
        });
        res.json(product);
      }

    } catch (error) {
      console.error("Erreur lors de la récupération des produits du panier :", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  });
