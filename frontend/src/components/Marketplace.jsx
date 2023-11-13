import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";
import ShoppingCart from "./ShoppingCart";
import "../styles/Marketplace.css"; // Assurez-vous de créer un fichier CSS pour ces styles.

const Marketplace = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des produits :", error)
      );
  }, []);

  const handleAddToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);
    if (existingProduct?.quantity >= product.inventory) {
      alert("Inventaire insuffisant !");
      return false;
    }
    dispatch(addToCart(product));
    alert("Produit ajouté au panier !");
    return true;
  };

  return (
    <>
      <div>
        <h1 className="marketplace-title">Marketplace</h1>
      </div>
      <div className="marketplace-container">
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product">
              <img src={product.image} alt={`Product: ${product.name}`} />
              <h3>{product.name}</h3>
              <p>Prix: ${product.price}</p>
              <p>Stock: {product.inventory}</p>
              <button onClick={() => handleAddToCart(product)}>
                Ajouter au panier
              </button>
            </div>
          ))}
        </div>
        <div className="cart-actions"></div>
        <ShoppingCart />
      </div>
    </>
  );
};

export default Marketplace;
