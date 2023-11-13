const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 3000;

// Configuration de la connexion à la base de données
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "Djyxgogo93",
  database: "braderytest",
};

const connection = mysql.createConnection(dbConfig);

// Autres configurations et middleware
app.use(cors()); // Ce middleware permettra à toutes les origines d'accéder au backend
app.use(express.json());

// Routes et autres configurations
const productsRouter = require("./routes/products");
const ordersRouter = require("./routes/orders");

// Placez la route pour le gestionnaire de commandes avant celle du gestionnaire de produits
app.use("/orders", ordersRouter);
app.use("/products", productsRouter);

// db accessible à toutes les routes
app.locals.db = connection;

// Écoute du port
app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}.`);
});
