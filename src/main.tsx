import "./styles/main.scss"; // Global SCSS file

import { createRoot, hydrateRoot } from "react-dom/client";

import App from "./App.tsx";
import { Provider } from "react-redux";
import { StrictMode } from "react";
import { ToastContainer } from "react-toastify";
import { store } from "./store/store";

// Check if the app is running in SSR mode
const container = document.getElementById("root")!;
const initialApp = (
  <StrictMode>
    <Provider store={store}>
      <ToastContainer position="top-center" />
      <App />
    </Provider>
  </StrictMode>
);

if (container.hasChildNodes()) {
  // Hydrate in SSR mode
  hydrateRoot(container, initialApp);
} else {
  // Render normally in CSR mode
  const root = createRoot(container);
  root.render(initialApp);
}
