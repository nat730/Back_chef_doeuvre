import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authenticationMiddleware from '../../middleware/middleware_jws';
import { Customer } from '../..';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.put('/api/user/email', authenticationMiddleware, async (req: Request, res: Response) => {
    try {
        const userId = req.body.id;
        const { currentMail, mail, mailConfirmation } = req.body;

        const user = await Customer.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé.' });
        }

        //@ts-ignore
        if (currentMail !== user.email) {
            return res.status(401).json({ error: 'Mail actuel incorrect.' });
        }

        if (mail !== mailConfirmation) {
            return res.status(400).json({ error: 'Les adresses e-mail ne correspondent pas.' });
        }

        await user.update({ email: mail });

        res.json({ message: 'Adresse e-mail modifiée avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la modification de l\'adresse e-mail :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});
