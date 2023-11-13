import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/actions/cartActions";
import { Link } from "react-router-dom";
import "../styles/Checkout.css";

const ShoppingCart = () => {
  // Utilisation du sélecteur pour obtenir les articles du panier depuis le store
  const cartItems = useSelector((state) => state.cart.items);

  // Utilisation du hook useDispatch pour envoyer des actions au store
  const dispatch = useDispatch();

  // Fonction pour supprimer un produit du panier
  const handleRemoveFromCart = (productId) => {
    // Envoi de l'action au store pour supprimer le produit du panier
    dispatch(removeFromCart(productId));

    alert("Produit supprimé du panier !");
  };

  return (
    <div className="shopping-cart-container">
      <h2>Panier</h2>

      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - Prix: ${item.price * item.quantity} - Quantité:{" "}
            {item.quantity}
            <button onClick={() => handleRemoveFromCart(item.id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>

      <Link to="/Checkout">checkout</Link>
    </div>
  );
};

export default ShoppingCart;
