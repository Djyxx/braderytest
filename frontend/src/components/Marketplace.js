import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";
import ShoppingCart from "./ShoppingCart";

const Marketplace = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des produits :", error)
      );
  }, []);
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    alert("Produit ajouté au panier !");
    setSelectedProduct(null);
  };

  return (
    <div>
      <h1>Marketplace</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product">
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
  );
};

export default Marketplace;
