// Marketplace.js

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";
import ShoppingCart from "./ShoppingCart"; // Importez le composant ShoppingCart

const Marketplace = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Utilisez useEffect pour charger les produits depuis le backend au chargement du composant
  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des produits :", error)
      );
  }, []); // Le tableau vide assure que cette requête est effectuée une seule fois au chargement

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    alert("Produit ajouté au panier !");
    setSelectedProduct(null);
  };

  return (
    <div>
      <h1>Marketplace</h1>
      <div className="product-list">
        {/* Affichez la liste des produits ici */}
        {products.map((product) => (
          <div key={product.id} className="product">
            <h3>{product.name}</h3>
            <p>Prix: ${product.price}</p>
            <p>Stock: {product.inventory}</p>
            {/* Appel direct de handleAddToCart lors du clic sur le bouton */}
            <button onClick={() => handleAddToCart(product)}>
              Ajouter au panier
            </button>
          </div>
        ))}
      </div>
      <div className="cart-actions">
        {/* Supprimez ce bouton s'il n'est plus nécessaire */}
        {/* <button onClick={handleAddToCart}>Ajouter au panier</button> */}
      </div>
      {/* Ajoutez le composant ShoppingCart ici */}
      <ShoppingCart />
    </div>
  );
};

export default Marketplace;
