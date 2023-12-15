import { Request, Response, Router } from 'express';
import authenticationMiddleware from '../../middleware/middleware_jws';
import { Customer } from '../..';

export const phonecustomerRouter = Router();

phonecustomerRouter.put('/api/user/phone', authenticationMiddleware, async (req: Request, res: Response) => {
    try {
        const userId = req.body.id;
        const { currentphone, phone, phoneConfirmation } = req.body;

        const user = await Customer.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé.' });
        }

        //@ts-ignore
        if (currentphone !== user.phone) {
            return res.status(401).json({ error: 'phone actuel incorrect.' });
        }

        if (phone !== phoneConfirmation) {
            return res.status(400).json({ error: 'Les phones ne correspondent pas.' });
        }

        await user.update({ phone: phone });

        res.json({ message: ' phone modifiée avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la modification de l\' phone :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});
