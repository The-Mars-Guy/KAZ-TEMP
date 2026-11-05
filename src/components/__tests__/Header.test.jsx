import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../Header.jsx";

function renderHeader(path = "/") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Header />
    </MemoryRouter>
  );
}

test("renders the wordmark with the primary and formal names", () => {
  renderHeader();
  const brand = screen.getByRole("link", { name: /father kaz ligęza/i });
  expect(brand).toBeInTheDocument();
  expect(brand).toHaveTextContent(/rev\. kazimierz ligęza, phd/i);
});

test("renders the primary navigation with the consolidated destinations", () => {
  renderHeader();
  const nav = screen.getByRole("navigation", { name: /primary/i });
  const labels = [
    "Home",
    "About Father Kaz",
    "Academic Work",
    "Ministry & Service",
    "Publications",
  ];
  labels.forEach((label) => {
    expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
  });
  expect(nav).toBeInTheDocument();
  // Removed / consolidated destinations must not appear.
  ["Books", "Store"].forEach((label) => {
    expect(screen.queryByRole("link", { name: label })).toBeNull();
  });
});

test("menu toggle opens and closes on click and Escape", () => {
  renderHeader();
  const button = screen.getByRole("button", { name: /open menu/i });
  expect(button).toHaveAttribute("aria-expanded", "false");

  fireEvent.click(button);
  const closeButton = screen.getByRole("button", { name: /close menu/i });
  expect(closeButton).toHaveAttribute("aria-expanded", "true");

  fireEvent.keyDown(document, { key: "Escape" });
  expect(
    screen.getByRole("button", { name: /open menu/i })
  ).toHaveAttribute("aria-expanded", "false");
});

test("locks body scroll while the mobile menu is open and restores on close", () => {
  renderHeader();
  expect(document.body.style.overflow).toBe("");

  fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
  expect(document.body.style.overflow).toBe("hidden");

  fireEvent.keyDown(document, { key: "Escape" });
  expect(document.body.style.overflow).toBe("");
});
