import { Request, Response, Router } from "express";
import { Catalog } from "..";
import authenticationMiddleware from "../middleware/middleware_connexion";
import adminMiddleware from "../middleware/middleware_admin";

export const catalogRouter = Router();

// Create - Ajouter un nouveau catalogue
catalogRouter.post("/",adminMiddleware, async (req: Request, res: Response) => {
  try {
    const { store } = req.body;
    const newCatalog = await Catalog.create({ store });
    res.json(newCatalog);
  } catch (error) {
    console.error("Erreur lors de la création d'un catalogue :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

// Read - Récupérer tous les catalogues
catalogRouter.get("/", async (req, res) => {
  try {
    const allCatalogs = await Catalog.findAll();
    return res.status(200).json(allCatalogs);
  } catch (error) {
    console.error("Erreur lors de la création d'un catalogue :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

// Read - Récupérer un catalogue spécifique par son ID
catalogRouter.get("/:catalogId", async (req, res) => {
  const catalogId = req.params.catalogId;

  try {
    const catalog = await Catalog.findByPk(catalogId);
    if (!catalog) {
      return res.status(404).json({ error: "Catalogue non trouvé." });
    }
    return res.status(200).json(catalog);
  } catch (error) {
    console.error("Erreur lors de la création d'un catalogue :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

// Update - Mettre à jour un catalogue spécifique par son ID
catalogRouter.put("/:catalogId",adminMiddleware, async (req, res) => {
  const catalogId = req.params.catalogId;

  try {
    const catalogToUpdate = await Catalog.findByPk(catalogId);
    if (!catalogToUpdate) {
      return res.status(404).json({ error: "Catalogue non trouvé." });
    }

    await catalogToUpdate.update(req.body);
    return res.status(200).json(catalogToUpdate);
  } catch (error) {
    console.error("Erreur lors de la création d'un catalogue :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

// Delete - Supprimer un catalogue spécifique par son ID
catalogRouter.delete("/:catalogId",adminMiddleware, async (req, res) => {
  const catalogId = req.params.catalogId;

  try {
    const catalogToDelete = await Catalog.findByPk(catalogId);
    if (!catalogToDelete) {
      return res.status(404).json({ error: "Catalogue non trouvé." });
    }

    await catalogToDelete.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error("Erreur lors de la création d'un catalogue :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});
