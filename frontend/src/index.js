// Importez les dépendances nécessaires
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store"; // Assurez-vous que le chemin est correct

// Importez le composant principal de votre application (Marketplace dans cet exemple)
import Marketplace from "./components/Marketplace"; // Assurez-vous que le chemin est correct
// Importez le fichier CSS principal (si vous en avez un)
//import "./index.css"; Assurez-vous que le chemin est correct

// Le composant racine englobé dans le Redux Provider
const App = (
  <Provider store={store}>
    <Marketplace />
  </Provider>
);

// Rendu du composant racine dans l'élément avec l'id "root" du fichier public/index.html
const root = createRoot(document.getElementById("root"));
root.render(App);
