const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItemInCart = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItemInCart) {
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
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
};

export default cartReducer;
