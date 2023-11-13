import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart } from "../redux/actions/cartActions";
import "../styles/Checkout.css";
import { Link } from "react-router-dom";
import { clearCart } from "../redux/actions/cartActions";

const Checkout = () => {
  // Utilisation du hook useNavigate pour la navigation
  const navigate = useNavigate();

  // Utilisation du sélecteur pour obtenir les articles du panier depuis le store
  const cartItems = useSelector((state) => state.cart.items);

  // Utilisation du dispatch pour envoyer des actions au store
  const dispatch = useDispatch();

  // State local pour les données du formulaire
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });

  // Calcul du montant total à payer
  const totalAmount = parseFloat(
    cartItems
      .reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0)
      .toFixed(2)
  );

  // Fonction pour gérer les modifications des champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fonction pour supprimer un article du panier
  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Création de l'objet contenant les données de la commande
    const orderData = {
      total_price: totalAmount,
      products: cartItems,
      ...formData,
    };

    try {
      // Envoi de la requête pour créer la commande
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

      // Affichage d'une alerte pour indiquer le succès de la commande
      alert("Commande soumise avec succès !");

      // Réinitialisation du panier après la commande
      dispatch(clearCart());

      // Redirection vers la page Marketplace
      setTimeout(() => {
        navigate("/marketplace");
      }, 2000);
    } catch (error) {
      console.error("Erreur lors de la soumission de la commande :", error);
    }
  };

  return (
    <div className="checkout-container">
      <Link to="/marketplace">Marketplace</Link>

      <h1 className="checkout-title">Validation de la commande</h1>

      <h2 className="checkout-subtitle">Détails de la commande :</h2>

      <ul className="checkout-list">
        {cartItems.map((item) => (
          <li key={item.id} className="checkout-item">
            {item.name} - Prix : ${item.price * item.quantity} - Quantité :{" "}
            {item.quantity}
            <button
              onClick={() => handleRemoveFromCart(item.id)}
              className="remove-button"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>

      <p className="checkout-total">Total à payer : ${totalAmount}</p>

      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label htmlFor="firstName" className="form-label">
            Prénom :
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="lastName" className="form-label">
            Nom :
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email :
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="address" className="form-label">
            Adresse :
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </label>
        </div>

        <button type="submit" className="submit-button">
          Valider le paiement
        </button>
      </form>
    </div>
  );
};

export default Checkout;
