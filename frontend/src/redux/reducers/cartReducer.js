// État initial du panier
const initialState = {
  items: [],
};

// Reducer pour gérer les actions liées au panier
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      // Vérifier si le produit est déjà dans le panier
      const existingItemInCart = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItemInCart) {
        // Mettre à jour la quantité si le produit est déjà dans le panier
        const updatedList = state.items.map((item) => {
          if (item.id === action.payload.id) {
            item.quantity += 1;
          }
          return item;
        });

        return {
          ...state,
          items: updatedList,
        };
      }

      // Ajouter le produit avec une quantité initiale de 1 s'il n'est pas déjà dans le panier
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };

    case "REMOVE_FROM_CART":
      // Supprimer un produit du panier
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "CLEAR_CART":
      // Vider complètement le panier
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
};

export default cartReducer;
