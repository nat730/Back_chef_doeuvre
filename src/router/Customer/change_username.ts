import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authenticationMiddleware from '../../middleware/middleware_jws';
import { Customer } from '../..';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.put('/api/user/username', authenticationMiddleware, async (req: Request, res: Response) => {
    try {
        const userId = req.body.id;
        const { currentusername, username, usernameConfirmation } = req.body;

        const user = await Customer.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé.' });
        }

        //@ts-ignore
        if (currentusername !== user.username) {
            return res.status(401).json({ error: 'username actuel incorrect.' });
        }

        if (username !== usernameConfirmation) {
            return res.status(400).json({ error: 'Les usernames ne correspondent pas.' });
        }

        await user.update({ username: username });

        res.json({ message: ' username modifiée avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la modification de username :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});
