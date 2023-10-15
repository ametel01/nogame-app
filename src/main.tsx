import React from "react";
import ReactDOM from "react-dom/client";
import { StarknetProvider } from "./components/provider";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StarknetProvider>
      <App />
    </StarknetProvider>
  </React.StrictMode>
);
