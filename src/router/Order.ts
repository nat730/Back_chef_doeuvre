import { Request, Response, Router } from "express";
import { Customer, Order, OrderItem } from "..";
import authenticationMiddleware from "../middleware/middleware_connexion";
import adminMiddleware from "../middleware/middleware_admin";

export const orderRouter = Router();
orderRouter.use(authenticationMiddleware)

orderRouter.post("/", async (req: Request, res: Response) => {
    try {
        const { order_date, collect_schedule, status } = req.body;
        const customer_id = req.customer?.userId;

        if (!order_date || !collect_schedule) {
            return res.status(400).json({
                error: "Veuillez fournir toutes les informations nécessaires.", order_date, collect_schedule
            });
        }
        if (customer_id) {
        const newOrder = await Order.create({ order_date, status, collect_schedule, customer_id });
        res.status(201).json(newOrder);
    }
    } catch (error) {
        console.error(
            "Erreur lors de l'ajout de la commande",
            error,
        );
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
});

orderRouter.put("/status/:id",adminMiddleware, async (req: Request, res: Response) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;
        const customer_id = req.customer?.userId;

        const orderToUpdate = await Order.findOne({ where: { id: orderId, customer_id: customer_id } });

        if (!orderToUpdate) {
            return res.status(404).json({ error: "Commande non trouvée." });
        }

        await orderToUpdate.update({ status });
        res.status(200).json(orderToUpdate);
    } catch (error) {
        console.error(
            "Erreur lors de la mise à jour de la commande",
            error,
        );
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
});

orderRouter.get("/:firstname", async (req: Request, res: Response) => {
    try {
      const { firstname } = req.params;
  
      const orders = await Order.findAll({
        where: {
          "$customer.firstname$": firstname,
        },
        include: [
          {
            model: Customer,
            as: "customer",
            attributes: [],
          },
        ],
      });
  
      if (orders.length === 0) {
        return res.status(404).json({ error: "Aucune commande trouvée pour ce prénom." });
      }
  
      res.status(200).json(orders);
    } catch (error) {
      console.error("Erreur lors de la récupération des commandes", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  });

  
  orderRouter.get("/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({
          error: "Veuillez fournir un ID.",
        });
      }
  
      const order = await Order.findByPk(id);
  
      if (!order) {
        return res.status(404).json({
          error: "Aucune commande trouvée avec cet ID.",
        });
      }
  
      res.status(200).json(order);
    } catch (error) {
      console.error("Erreur lors de la récupération de la commande", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  });
  
  orderRouter.get("/product/:productId", async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
  
      if (!productId) {
        return res.status(400).json({
          error: "Veuillez fournir un ID de produit.",
        });
      }
  
      const orderItems = await OrderItem.findAll({
        where: {
          id: productId,
        },
        include: [
          {
            model: Order,
            include: [
              {
                model: Customer,
                attributes: ["firstname", "lastname"],
              },
            ],
          },
        ],
      });
  
      if (orderItems.length === 0) {
        return res.status(418).json({
          error: "Aucune commande trouvée avec ce produit.",
        });
      }
  
      const uniqueOrders = [...new Set(orderItems.map((item) => item.get("Order")))];
  
      res.status(200).json(uniqueOrders);
    } catch (error) {
      console.error("Erreur lors de la récupération des commandes", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  }); 