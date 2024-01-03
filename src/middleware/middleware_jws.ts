import jwt from 'jsonwebtoken';
import { BlackList } from '../index';
import { NextFunction, Request, Response } from 'express';


const authenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ error: 'Token manquant. Authentification requise.' });
  }

  const [bearer, token] = authorizationHeader.split(' ');
  console.log('token', token, bearer);
   

  if (bearer !== 'Bearer' || !token) {
    console.log("error");
    
    return res.status(401).json({ error: 'Format de token incorrect. Authentification requise.' });
  }

  try {
    const decoded = jwt.verify(token, 'secret');
    console.log(token,"osgdhmjf");
    
    const isBlacklisted = await BlackList.findOne({ where: { token: token } })
    console.log(isBlacklisted,"prout");
    
    if (!isBlacklisted) {
      //@ts-ignore
      req.user = decoded;
      console.log("fdsvd");
      console.log(decoded,"prout");
      next();
    } else {
      return res.status(401).json({ error: 'Token invalide. Authentification requise. Prout' });
    }
  }
  catch (error) {
    return res.status(401).json({ error, message: 'Token invalide. Authentification requise.' });
  }
};

export default authenticationMiddleware;