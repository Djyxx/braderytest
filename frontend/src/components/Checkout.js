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

  const totalAmount = cartItems.reduce((total, item) => {
    console.log("Item:", item);
    console.log("Price:", item.price);
    return total + item.price;
  }, 0);

  // Fonction pour gérer les modifications des champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire soumis avec les données :", formData);
  };

  return (
    <div>
      <h1>Checkout</h1>
      <h2>Détails de la commande :</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - Prix: ${item.price}
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
