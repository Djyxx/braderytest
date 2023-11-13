import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Marketplace from "./components/Marketplace";
import Checkout from "./components/Checkout";

const App = () => <Marketplace />;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/marketplace",
    element: <Marketplace />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>{router}</RouterProvider>
    </Provider>
  </React.StrictMode>
);
