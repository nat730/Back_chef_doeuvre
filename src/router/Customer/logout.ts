import { Router } from 'express';
import { BlackList } from '../..';

export const logoutcustomerRouter = Router();

logoutcustomerRouter.post('/api/auth/local/logout', async (req, res) => {
    try {
      const tokenToBlacklist = req.headers.authorization;
  
      if (!tokenToBlacklist) {
        return res.status(401).json({ error: 'Token missing. Authentication required.' });
      }
  
      const [bearer, token] = tokenToBlacklist.split(' ');
        console.log("test", token);
      
      if (bearer !== 'Bearer' || !token) {
        return res.status(401).json({ error: 'Incorrect token format. Authentication required.' });
      }
  
      await BlackList.create({ jwtToken: token });
      const latestBlacklistedToken = await BlackList.findOne({
        order: [['createdAt', 'DESC']],
      });
  //@ts-ignore
      res.status(200).json({ message: 'Blacklist updated', latestToken: latestBlacklistedToken!.jwtToken });
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });