import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Publications from "../Publications.jsx";
import PublicationDetail from "../PublicationDetail.jsx";

function renderPublications() {
  return render(
    <MemoryRouter initialEntries={["/publications"]}>
      <Publications />
    </MemoryRouter>
  );
}

function renderDetail(slug) {
  return render(
    <MemoryRouter initialEntries={[`/publications/${slug}`]}>
      <Routes>
        <Route path="/publications/:slug" element={<PublicationDetail />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("Publications catalogue", () => {
  it("renders the catalogue and its main controls", () => {
    renderPublications();
    expect(screen.getByRole("heading", { name: /^publications$/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/search publications/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/language/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/sort/i)).toBeInTheDocument();
  });

  it("filters by search text and restores results on reset", async () => {
    renderPublications();
    const search = screen.getByLabelText(/search publications/i);

    fireEvent.change(search, { target: { value: "Saint Rita" } });

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /saint rita in moments of helplessness/i })).toBeInTheDocument();
      expect(screen.queryByRole("heading", { name: /365 reflections on the word of god/i })).toBeNull();
    });

    fireEvent.click(screen.getByRole("button", { name: /reset filters/i }));

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /365 reflections on the word of god/i })).toBeInTheDocument();
    });
  });

  it("filters prayer books by category", async () => {
    renderPublications();
    fireEvent.change(screen.getByLabelText(/category/i), { target: { value: "Prayer Books" } });

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /archangels near us/i })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /saint rita in moments of helplessness/i })).toBeInTheDocument();
      expect(screen.queryByRole("heading", { name: /365 reflections on the word of god/i })).toBeNull();
    });
  });

  it("filters by language", async () => {
    renderPublications();
    fireEvent.change(screen.getByLabelText(/language/i), { target: { value: "Polish" } });

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /homilie na temat.*credo/i })).toBeInTheDocument();
      expect(screen.queryByRole("heading", { name: /365 reflections on the word of god/i })).toBeNull();
    });
  });

  it("shows a useful empty state and can reset from it", async () => {
    renderPublications();
    fireEvent.change(screen.getByLabelText(/search publications/i), {
      target: { value: "zzzz-no-such-publication" },
    });

    expect(await screen.findByText(/no publications match/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /reset filters/i }));
    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /365 reflections on the word of god/i })).toBeInTheDocument();
    });
  });
});

describe("Publication detail attribution", () => {
  it("shows Saint Rita's author and Father Kaz's introduction separately", () => {
    renderDetail("saint-rita-in-moments-of-helplessness");
    expect(screen.getByRole("heading", { name: /saint rita in moments of helplessness/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Paweł Piotrowski/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Introduction by Rev\. Kazimierz Ligęza, PhD/).length).toBeGreaterThan(0);
  });

  it("shows Archangels Near Us as Lidia Frydzińska-Świątczak's book", () => {
    renderDetail("archangels-near-us");
    expect(screen.getByRole("heading", { name: /archangels near us/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Lidia Frydzińska-Świątczak/).length).toBeGreaterThan(0);
  });
});
