const express = require("express");
const router = express.Router();

// Route pour passer une commande
router.post("/order", async (req, res) => {
  const items = req.body?.items; // Les articles à acheter depuis le frontend

  if (!items || items.length === 0) {
    return res.status(400).json({
      error: "Les données de la commande sont manquantes ou incorrectes.",
    });
  }

  try {
    // Vérifie le stock pour chaque article
    for (const item of items) {
      const stockCheckQuery = `SELECT inventory FROM Products WHERE id = ${item.productId}`;
      const [stockResult] = await req.app.locals.db.query(stockCheckQuery);

      const availableStock = stockResult[0].inventory;

      if (item.quantity > availableStock) {
        return res.status(400).json({
          error: `Stock insuffisant pour l'article ${item.productId}`,
        });
      }
    }

    // Si tout est en stock, passe la commande
    const orderTotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const insertOrderQuery =
      "INSERT INTO Orders (total_price, products) VALUES (?, ?)";

    await req.app.locals.db.query(insertOrderQuery, [
      orderTotal,
      JSON.stringify(items),
    ]);

    // Mettre à jour le stock dans la base de données
    for (const item of items) {
      const updateStockQuery = `UPDATE Products SET inventory = inventory - ${item.quantity} WHERE id = ${item.productId}`;
      await req.app.locals.db.query(updateStockQuery);
    }

    // Répondre avec succès
    res
      .status(200)
      .json({ success: true, message: "Commande passée avec succès" });
  } catch (error) {
    console.error("Erreur lors du traitement de la commande : ", error);
    res.status(500).json({ error: "Erreur lors du traitement de la commande" });
  }
});

// Ajoute une nouvelle route pour récupérer toutes les commandes
router.get("/all", async (req, res) => {
  try {
    // Récupere toutes les commandes depuis la base de données
    const db = req.app.locals.db;
    const query = "SELECT * FROM Orders";
    const [orders] = await db.query(query);

    res.json(orders);
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes : ", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des commandes" });
  }
});

module.exports = router;
