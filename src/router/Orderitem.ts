import { Request, Response, Router } from "express";
import { OrderItem } from "..";
import authenticationMiddleware from "../middleware/middleware_connexion";
import { UnitySymbol } from "../models/order_item";

export const orderItemRouter = Router();

orderItemRouter.post("/", async (req: Request, res: Response) => {
  console.log("patate");

  try {
    const { quantity, price_by_unity, weight_unity, unity_symbol, price_by_unity_asso } = req.body;

    let price_per_kg = undefined;
    let price_per_kg_asso = undefined;

    if (weight_unity !== 0) {
      if (unity_symbol === UnitySymbol.KG || unity_symbol === UnitySymbol.L) {
        price_per_kg = price_by_unity / weight_unity;
        price_per_kg_asso = price_by_unity_asso / weight_unity;
      }
    }
    else {
      throw new Error("Le poids unitaire ne peut pas être égale à zéro");
    }

    const newOrderItem = await OrderItem.create({
      quantity,
      price_by_unity,
      price_by_unity_asso,
      weight_unity,
      unity_symbol,
      price_per_kg,
      price_per_kg_asso
    });

    res.status(201).json(newOrderItem);
  } catch (error) {
    console.error("Erreur lors de la création de l'OrderItem", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

orderItemRouter.get("/:id", authenticationMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const orderItem = await OrderItem.findByPk(id);

    if (!orderItem) {
      return res.status(404).json({ error: "OrderItem non trouvé" });
    }

    res.status(200).json(orderItem);
  } catch (error) {
    console.error("Erreur lors de la lecture de l'OrderItem", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

orderItemRouter.put("/:id", authenticationMiddleware, async (req: Request, res: Response) => {
  let price_per_kg = undefined;
  let price_per_kg_asso = undefined;
  try {
    const { id } = req.params;
    const { quantity, price_by_unity, weight_unity, unity_symbol, price_by_unity_asso } = req.body;
    if (weight_unity !== 0) {
      if (unity_symbol === UnitySymbol.KG || unity_symbol === UnitySymbol.L) {
        price_per_kg = price_by_unity / weight_unity;
        price_per_kg_asso = price_by_unity_asso / weight_unity;
      }
    }
    else {
      throw new Error("Le poids unitaire ne peut pas être égale à zéro");
    }
    const orderItem = await OrderItem.findByPk(id);

    if (!orderItem) {
      return res.status(404).json({ error: "OrderItem non trouvé" });
    }

    await orderItem.update({
      quantity,
      price_by_unity,
      weight_unity,
      unity_symbol,
      price_by_unity_asso,
      price_per_kg,
      price_per_kg_asso,
    });

    res.status(200).json(orderItem);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'OrderItem", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

orderItemRouter.delete("/:id", authenticationMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const orderItem = await OrderItem.findByPk(id);

    if (!orderItem) {
      return res.status(404).json({ error: "OrderItem non trouvé" });
    }

    await orderItem.destroy();

    res.status(204).send();
  } catch (error) {
    console.error("Erreur lors de la suppression de l'OrderItem", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});
