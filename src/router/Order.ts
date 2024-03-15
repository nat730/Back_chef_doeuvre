import { Request, Response, Router } from "express";
import { Order } from "..";
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
