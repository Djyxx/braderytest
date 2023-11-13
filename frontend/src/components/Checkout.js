import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/actions/cartActions";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });

  const totalAmount = parseFloat(
    cartItems
      .reduce((total, item) => {
        console.log("Item:", item);
        console.log("Price:", item.price);
        return total + item.price * item.quantity;
      }, 0)
      .toFixed(2)
  );

  console.log("Total Amount:", totalAmount);

  // Fonction pour gérer les modifications des champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulaire soumis avec les données :", formData);

    // Créez un objet contenant les données de la commande
    const orderData = {
      total_price: totalAmount,
      products: cartItems,
      ...formData,
    };

    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("La requête a échoué.");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission de la commande :", error);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <h2>Détails de la commande :</h2>
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
      <p>Total à payer : ${totalAmount}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Prénom :
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Nom :
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Email :
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Adresse :
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <button type="submit">Valider le paiement</button>
      </form>
    </div>
  );
};

export default Checkout;
