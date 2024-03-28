import { Request, Response, Router } from "express";
import authenticationMiddleware from "../middleware/middleware_connexion";
import { OrderItem, Product } from "..";
import { Op } from "sequelize";

export const invoiceRouter = Router();

invoiceRouter.get("/:id", authenticationMiddleware, async (req: Request, res: Response) => {
    const orderId = req.params.id;
    const orderItems = await OrderItem.findAll({ where: { order_id: req.params.id } });
    const productIds = orderItems.map(orderItem => orderItem.product_id).filter(id => id ) as number[];
    const products = await Product.findAll({ where: { id: { [Op.in]: productIds } } }); // op = operator (permet de faire des "where clauses")
    console.log(orderId,orderItems,productIds,products);
    
    res.json({ orderItems, products });
})