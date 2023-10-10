import { InjectedConnector, StarknetConfig } from "@starknet-react/core";
import { WebWalletConnector } from "@argent/starknet-react-webwallet-connector";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const connectors = [
  new InjectedConnector({ options: { id: "braavos" } }),
  new InjectedConnector({ options: { id: "argentX" } }),
  new WebWalletConnector({
    url: "https://web.hydrogen.argent47.net",
  }),
];

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StarknetConfig autoConnect connectors={connectors}>
      <App />
    </StarknetConfig>
  </React.StrictMode>
);
