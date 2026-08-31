import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { AppRoutes } from "@/app/router";
import "@/styles/index.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("No se encontró el elemento raíz de la presentación.");
}

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>,
);
