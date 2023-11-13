const express = require("express");
const router = express.Router();

// Modèle de commande (simulé)
let orders = [];

const updateQuantity = async (db, products) => {
  return products.map(async (item) => {
    const getItemQuery = `SELECT * from Products where id = ${item.id}`;
    let product;
    await db.query(getItemQuery, async (err, results) => {
      if (results.length) {
        product = results[0];
        const query = `UPDATE Products SET inventory = ${
          product.inventory - item.quantity
        } where id = ${item.id}`;

        return db.query(query, (err) => {
          if (err) {
            console.error(
              "Erreur lors de la mise à jour de l'inventaire" + err.message
            );
          }
        });
      }
    });
  });
};

// Route pour récupérer toutes les commandes
router.get("/", (req, res) => {
  res.json(orders);
});

// Route pour créer une nouvelle commande
router.post("/", async (req, res) => {
  console.log("Requête POST reçue sur /orders");
  console.log(req.body);
  console.log(req.body.products);
  const db = req.app.locals.db; // Accéde à la connexion à la base de données depuis app.js
  const { total_price, products } = req.body;

  // Vérifiez si les données requises sont présentes
  if (!total_price || !products) {
    return res.status(400).json({
      error: "Veuillez fournir le prix total et les produits de la commande.",
    });
  }

  await updateQuantity(db, products);

  // Créez une nouvelle commande
  const newOrder = {
    id: orders.length + 1, // générateur d'ID unique
    total_price,
    order_date: new Date(),
    products,
  };

  // Insérez la nouvelle commande dans la base de données
  const insertOrderQuery = `INSERT INTO Orders (total_price, order_date, products) VALUES (?, ?, ?)`;

  db.query(
    insertOrderQuery,
    [
      newOrder.total_price,
      newOrder.order_date.toISOString().slice(0, 19).replace("T", " "),
      JSON.stringify(newOrder.products),
    ],
    (err, result) => {
      if (err) {
        console.error(
          "Erreur lors de l'insertion de la commande :",
          err.message
        );
        return res
          .status(500)
          .json({ error: "Erreur lors de la création de la commande." });
      }

      // Ajoute la nouvelle commande à la liste des commandes
      orders.push(newOrder);

      res.status(201).json(newOrder);
    }
  );
});

module.exports = router;
