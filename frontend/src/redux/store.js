import { createStore, combineReducers } from "redux";
import cartReducer from "./reducers/cartReducer";

// Combinaison de tous les reducers pour créer le rootReducer
const rootReducer = combineReducers({
  cart: cartReducer,
});

// Création du store Redux en utilisant le rootReducer
const store = createStore(rootReducer);

export default store;
