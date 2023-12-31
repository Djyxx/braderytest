import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Marketplace from "./components/Marketplace";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Marketplace />
      </div>
    </Provider>
  );
}

export default App;
