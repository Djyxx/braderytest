const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3000;

// Configuration de la connexion à la base de données
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const connection = mysql.createConnection(dbConfig);

// Middleware et configuration
app.use(cors()); // Middleware permettant à toutes les origines d'accéder au backend
app.use(express.json()); // Middleware pour traiter les données JSON

// Routes et autres configurations
const productsRouter = require("./routes/products");
const ordersRouter = require("./routes/orders");

// Configuration des routes pour les gestionnaires de commandes et de produits
app.use("/orders", ordersRouter);
app.use("/products", productsRouter);

// Rend la connexion à la base de données accessible à toutes les routes
app.locals.db = connection;

// Écoute du port
app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}.`);
});
