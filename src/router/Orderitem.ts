import { Request, Response, Router } from "express";
import { OrderItem } from "..";
import authenticationMiddleware from "../middleware/middleware_connexion";

export const orderItemRouter = Router();

orderItemRouter.post("/", async (req: Request, res: Response) => {
  console.log("patate");
    
  try {
      const { quantity, price_by_unity, unity_value, unity_symbol, price_asso, price_per_kg_asso } = req.body;
      
      const newOrderItem = await OrderItem.create({
        quantity,
        price_by_unity,
        unity_value,
        unity_symbol,
        price_asso,
        price_per_kg_asso,
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
    try {
      const { id } = req.params;
      const { quantity, price_by_unity, unity_value, unity_symbol, price_asso, price_per_kg_asso } = req.body;
  
      const orderItem = await OrderItem.findByPk(id);
  
      if (!orderItem) {
        return res.status(404).json({ error: "OrderItem non trouvé" });
      }
  
      await orderItem.update({
        quantity,
        price_by_unity,
        unity_value,
        unity_symbol,
        price_asso,
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
  