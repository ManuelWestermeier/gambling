import ClientProvider from "./contexts/wsnet-client.tsx";
import AuthProvider from "./contexts/auth.tsx";
import { HashRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./pages/index.css";
import React from "react";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClientProvider>
      <AuthProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </AuthProvider>
    </ClientProvider>
  </React.StrictMode>
);
