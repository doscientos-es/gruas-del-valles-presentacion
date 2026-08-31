import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AppRoutes } from "@/app/router";

vi.mock("@/shared/hooks/useReducedMotion", () => ({
  useReducedMotion: () => true,
}));

afterEach(cleanup);

describe("presentation routes", () => {
  it("shows the five navigation areas from the home hub", () => {
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
    expect(screen.getByText(/700 Tn/i)).toBeInTheDocument();
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

  it("renders a direct route for fleet information", () => {
    render(
      <MemoryRouter initialEntries={["/flota"]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: /máquina adecuada/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/hasta 700 Tn/i)).toBeInTheDocument();
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
