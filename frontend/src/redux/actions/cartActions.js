// Action pour ajouter un produit au panier
export const addToCart = (product) => {
  return {
    type: "ADD_TO_CART",
    payload: product,
  };
};

// Action pour supprimer un produit du panier
export const removeFromCart = (itemId) => {
  return {
    type: "REMOVE_FROM_CART",
    payload: itemId,
  };
};

// Action pour vider complètement le panier
export const clearCart = () => {
  return {
    type: "CLEAR_CART",
  };
};
