import { Request, Response, NextFunction } from "express";

const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.customer?.role === "admin") {

    next();
  } else {
    res.status(403).json({ error: "Accès refusé. Vous devez être un admin."});
  }
};
export default adminMiddleware;
