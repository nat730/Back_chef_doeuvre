import { Request, Response, Router } from "express";
import authenticationMiddleware from "../middleware/middleware_connexion";
import { Customer, BlackList } from "..";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

export const authRouter = Router();

// Update Email Route
authRouter.put("/email/:id",authenticationMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { currentMail, mail, mailConfirmation } = req.body;

    const user = await Customer.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }
    if (currentMail !== user.dataValues.email) {
      return res.status(401).json({ error: "Mail actuel incorrect." });
    }

    if (mail !== mailConfirmation) {
      return res
        .status(400)
        .json({ error: "Les adresses e-mail ne correspondent pas." });
    }

    await user.update({ email: mail });

    res.json({ message: "Adresse e-mail modifiée avec succès." });
  } catch (error) {
    console.error(
      "Erreur lors de la modification de l'adresse e-mail :",
      error,
    );
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

// Update Password Route
authRouter.put("/password/:id",authenticationMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { currentPassword, password, passwordConfirmation } = req.body;

    if (password !== passwordConfirmation) {
      return res
        .status(400)
        .json({ error: "Les nouveaux mots de passe ne correspondent pas." });
    }

    const user = await Customer.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    const passwordMatch = await bcrypt.compare(
      currentPassword,
      user.dataValues.password,
    );

    if (!passwordMatch) {
      return res.status(401).json({ error: "Mot de passe actuel incorrect." });
    }

    const hashedNewPassword = await bcrypt.hash(password, 10);
    await user.update({ password: hashedNewPassword });

    res.json({ message: "Mot de passe modifié avec succès." });
  } catch (error) {
    console.error("Erreur lors de la modification du mot de passe :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

// Update Phone Route
authRouter.put("/phone/:id",authenticationMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { currentphone, phone, phoneConfirmation } = req.body;

    const user = await Customer.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    if (currentphone !== user.dataValues.phone) {
      return res
        .status(401)
        .json({ error: "Numéro de téléphone actuel incorrect." });
    }

    if (phone !== phoneConfirmation) {
      return res
        .status(400)
        .json({ error: "Les numéros de téléphone ne correspondent pas." });
    }

    await user.update({ phone: phone });

    res.json({ message: "Numéro de téléphone modifié avec succès." });
  } catch (error) {
    console.error("Erreur lors de la modification du téléphone :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

// Login Route
authRouter.post("/local", async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body;
    const user = await Customer.findOne({ where: { email: identifier } });
    if (!user || !(await bcrypt.compare(password, user.dataValues.password))) {
      return res.status(401).json({ error: "Identifiants invalides" });
    }
    const jwtToken = jwt.sign(
      { userId: user.dataValues.id, role: user.dataValues.role },
      "secret",
      { expiresIn: "1h" },
    );
    res.status(200).json({ message: "Connexion réussie", jwtToken });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res
      .status(500)
      .json({ message: "Erreur interne du serveur", error: error });
  }
});


// Logout Route
authRouter.post("/local/logout", async (req, res) => {
  try {
    const tokenToBlacklist = req.headers.authorization;

    if (!tokenToBlacklist) {
      return res
        .status(401)
        .json({ error: "Token missing. Authentication required." });
    }

    const [bearer, token] = tokenToBlacklist.split(" ");

    if (bearer !== "Bearer" || !token) {
      return res
        .status(401)
        .json({ error: "Incorrect token format. Authentication required." });
    }

    const existingToken = await BlackList.findOne({
      where: { token: token },
    });

    if (existingToken) {
      return res
        .status(409)
        .json({ error: "Ce token a déjà été utilisé pour la déconnexion." });
    }

    // Enregistrement de la déconnexion dans la base de données
    await BlackList.create({ token: token });

    return res.status(204).json({ error: "deconnexion effectuer avec succes" });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Register Route
authRouter.post("/local/register", async (req: Request, res: Response) => {
  try {
    const { password, firstname, lastname, email, phone,address,role } = req.body;

    if (!password || !firstname || !lastname || !email || !phone|| !address) {
      return res
      .status(400)
      .json({
        error: "Veuillez fournir toutes les informations nécessaires.",password, firstname, lastname, email, phone,address
      });
    }

    const existingCustomer = await Customer.findOne({ where: { email } });

    if (existingCustomer) {
      return res.status(409).json({ error: "Cet utilisateur existe déjà" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newCustomer = await Customer.create({
      password: hashedPassword,
      firstname,
      lastname,
      email,
      phone,
      address,
      role
    });

    const result = newCustomer.dataValues;
    delete result.password;

    res.status(201).json(result);
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});
