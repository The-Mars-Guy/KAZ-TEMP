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
  const brand = screen.getByRole("link", { name: /father kaz ligeza/i });
  expect(brand).toBeInTheDocument();
  expect(brand).toHaveTextContent(/rev\. kazimierz ligeza, ph\.d\./i);
});

test("renders the primary navigation with all links", () => {
  renderHeader();
  const nav = screen.getByRole("navigation", { name: /primary/i });
  const labels = ["Home", "About", "Books", "Store", "Contact"];
  labels.forEach((label) => {
    expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    expect(nav).toBeInTheDocument();
  });
  // Removed sections must no longer be present.
  ["Homilies", "Articles", "Audio", "Speaking"].forEach((label) => {
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
