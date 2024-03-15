import { Request, Response, NextFunction } from "express";
import authenticationMiddleware from "./middleware_connexion";

const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("middlware",req.customer);
  authenticationMiddleware(req, res, function() {
    if (req.customer?.role === "admin") {
      next();
    } else {
      res.status(403).json({ error: "Accès refusé. Vous devez être un admin."});
    }
  })
};
export default adminMiddleware;
