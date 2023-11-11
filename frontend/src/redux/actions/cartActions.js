export const addToCart = (product) => {
  return {
    type: "ADD_TO_CART",
    payload: {
      ...product,
      id: product.id + Math.random(),
    },
  };
};

export const removeFromCart = (itemId) => {
  return {
    type: "REMOVE_FROM_CART",
    payload: itemId,
  };
};

export const clearCart = () => {
  return {
    type: "CLEAR_CART",
  };
};
