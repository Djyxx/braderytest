import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/actions/cartActions";
import { Link } from "react-router-dom";

const ShoppingCart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
    alert("Produit supprimé du panier !");
  };

  return (
    <div>
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
