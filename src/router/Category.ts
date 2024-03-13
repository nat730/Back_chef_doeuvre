import { Request, Response, Router } from "express";
import { Category } from "..";
import authenticationMiddleware from "../middleware/middleware_connexion";
import adminMiddleware from "../middleware/middleware_admin";


export const categoryRouter = Router();

categoryRouter.post("/",authenticationMiddleware,adminMiddleware, async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const newCategory = await Category.create({ name, description });
    res.json(newCategory);
  } catch (error) {
    console.error("Erreur lors de la création d'une catégorie :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

categoryRouter.delete("/:id",authenticationMiddleware,adminMiddleware, async (req, res) => {
  try {
    const categoryId = req.params.id;
    const categoryToDelete = await Category.findByPk(categoryId);

    if (!categoryToDelete) {
      return res.status(404).json({ error: "Catégorie non trouvée." });
    }

    await categoryToDelete.destroy();

    res.status(200).json({ message: "La catégorie a été supprimée." });
  } catch (error) {
    console.error(
      "Erreur lors de la suppression de la catégorie par ID :",
      error,
    );
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

categoryRouter.delete("/",authenticationMiddleware,adminMiddleware, async (req, res) => {
  try {
    await Category.destroy({ where: {} });
    res
      .status(200)
      .json({ message: "Toutes les catégories ont été supprimées." });
  } catch (error) {
    console.error(
      "Erreur lors de la suppression de toutes les catégories :",
      error,
    );
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

categoryRouter.get("/", async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

categoryRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;
    const categoryById = await Category.findByPk(categoryId);

    if (!categoryById) {
      return res.status(404).json({ error: "Catégorie non trouvée." });
    }

    res.json(categoryById);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de la catégorie par ID :",
      error,
    );
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

categoryRouter.put("/:id",authenticationMiddleware,adminMiddleware, async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name, description } = req.body;

    if (!name || !description) {
      return res
        .status(400)
        .json({
          error:
            "Veuillez fournir le nom et la description pour la mise à jour.",
        });
    }

    const categoryToUpdate = await Category.findByPk(categoryId);

    if (categoryToUpdate) {
      await categoryToUpdate.update({ name, description });
      res
        .status(200)
        .json({ message: "La catégorie a été modifiée avec succès." });
    } else {
      res.status(404).json({ error: "La catégorie n'a pas été trouvée." });
    }
  } catch (error) {
    console.error(
      "Erreur lors de la modification de la catégorie par ID :",
      error,
    );
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});