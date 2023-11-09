// Dans PaymentPage.js

import React, { useState } from "react";
import { useSelector } from "react-redux";

const PaymentPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });

  // Calculez le montant total du panier
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Fonction pour gérer les modifications des champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajoutez ici la logique pour soumettre le formulaire (par exemple, envoi à un backend)
    console.log("Formulaire soumis avec les données :", formData);
  };

  return (
    <div>
      <h1>Page de paiement</h1>
      <h2>Récapitulatif de la commande :</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - Prix: ${item.price} - Quantité: {item.quantity}
          </li>
        ))}
      </ul>
      <p>Total à payer : ${totalAmount}</p>
      {/* Ajoutez ici le formulaire */}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Confirmer la commande</button>
      </form>
    </div>
  );
};

export default PaymentPage;
