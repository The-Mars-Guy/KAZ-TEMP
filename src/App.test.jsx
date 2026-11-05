import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App.jsx";

function renderAt(path = "/") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );
}

test("renders the skip link and a page heading on the home route", async () => {
  renderAt("/");
  expect(screen.getByText(/skip to main content/i)).toBeInTheDocument();
  const headings = await screen.findAllByRole("heading", { level: 1 });
  expect(headings.length).toBeGreaterThanOrEqual(1);
});

test("renders the primary navigation with the consolidated destinations", () => {
  renderAt("/");
  const nav = screen.getByRole("navigation", { name: /primary/i });
  expect(nav).toBeInTheDocument();
  expect(
    screen.getAllByRole("link", { name: /^publications$/i }).length
  ).toBeGreaterThanOrEqual(1);
  expect(screen.queryByRole("link", { name: /^books$/i })).toBeNull();
  expect(screen.queryByRole("link", { name: /^store$/i })).toBeNull();
});

test("renders the footer with the formal name", () => {
  renderAt("/");
  const footer = screen.getByRole("contentinfo");
  expect(footer).toHaveTextContent(/kazimierz ligęza/i);
  expect(footer).toHaveTextContent(/father kaz ligęza/i);
});

test("redirects the legacy /books URL to Publications", async () => {
  renderAt("/books");
  expect(
    await screen.findByRole("heading", { name: /^publications$/i })
  ).toBeInTheDocument();
});

test("redirects the legacy /store URL to Publications", async () => {
  renderAt("/store");
  expect(
    await screen.findByRole("heading", { name: /^publications$/i })
  ).toBeInTheDocument();
});

test("renders the not-found page for unknown routes", async () => {
  renderAt("/this-route-does-not-exist");
  expect(
    await screen.findByRole("heading", { name: /page not found/i })
  ).toBeInTheDocument();
});
