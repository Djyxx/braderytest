const express = require("express");
const router = express.Router();

// Route pour récupérer tous les produits
router.get("/", (req, res) => {
  // Récupérez tous les produits depuis la base de données
  const db = req.app.locals.db; // Accédez à la connexion à la base de données depuis app.js

  const query = "SELECT * FROM Products";

  db.query(query, (err, results) => {
    if (err) {
      console.error(
        "Erreur lors de la récupération des produits : " + err.message
      );
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des produits." });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
