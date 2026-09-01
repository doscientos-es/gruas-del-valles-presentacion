import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";

import { AppRoutes } from "@/app/router";

vi.mock("@/shared/hooks/useReducedMotion", () => ({
  useReducedMotion: () => true,
}));

afterEach(cleanup);

describe("presentation routes", () => {
  it("shows the presentation chapters from the cover", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", {
        name: /capacidad y seguridad para operaciones críticas/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/700 Tn/i)).not.toHaveLength(0);
    expect(
      screen
        .getAllByRole("link")
        .filter((link) => link.getAttribute("href")?.startsWith("/")).length,
    ).toBeGreaterThanOrEqual(5);
    expect(screen.getByRole("link", { name: /seguridad/i })).toHaveAttribute(
      "href",
      "/seguridad",
    );
  });

  it("does not expose certifications as a standalone route", () => {
    render(
      <MemoryRouter initialEntries={["/certificaciones"]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: /esta sección no existe/i }),
    ).toBeInTheDocument();
  });

  it("renders a direct route for the flagship fleet information", () => {
    render(
      <MemoryRouter initialEntries={["/flota"]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: /la mejor grúa de la flota/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/700 Tn/i)).not.toHaveLength(0);
    expect(
      screen.getByRole("navigation", { name: /progreso de presentación/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /siguiente capítulo: equipo y experiencia/i,
      }),
    ).toHaveAttribute("href", "/equipo");
  });

  it("moves between chapters with the keyboard arrows", () => {
    render(
      <MemoryRouter initialEntries={["/flota"]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(
      screen.getByRole("heading", {
        name: /experiencia técnica donde más importa/i,
      }),
    ).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(
      screen.getByRole("heading", { name: /la mejor grúa de la flota/i }),
    ).toBeInTheDocument();
  });

  it("returns to the index with Escape", () => {
    render(
      <MemoryRouter initialEntries={["/flota"]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    fireEvent.keyDown(window, { key: "Escape" });
    expect(
      screen.getByRole("heading", {
        name: /capacidad y seguridad para operaciones críticas/i,
      }),
    ).toBeInTheDocument();
  });

  it("ends on the closing slide instead of looping to the index", () => {
    render(
      <MemoryRouter initialEntries={["/contacto"]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(
      screen.getByRole("heading", {
        name: /preparados para la próxima maniobra/i,
      }),
    ).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(
      screen.getByRole("heading", {
        name: /preparados para la próxima maniobra/i,
      }),
    ).toBeInTheDocument();
  });

  it("shows a recoverable state for an unknown section", () => {
    render(
      <MemoryRouter initialEntries={["/seccion-inexistente"]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: /esta sección no existe/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /volver al índice/i }),
    ).toHaveAttribute("href", "/");
  });
});
