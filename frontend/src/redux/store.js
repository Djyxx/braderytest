// store.js
import { createStore, combineReducers } from "redux";
import cartReducer from "./reducers/cartReducer"; // Assurez-vous que le chemin est correct

// Combinez tous vos reducers ici s'il y en a plusieurs
const rootReducer = combineReducers({
  cart: cartReducer,
  // Ajoutez d'autres reducers au besoin
});

// Créez le store avec le rootReducer
const store = createStore(rootReducer);

export default store;
