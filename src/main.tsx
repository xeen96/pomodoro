//react
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

//redux
import { Provider } from "react-redux";
import { store } from "./redux/store";

//other
import "./ui/globals.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
