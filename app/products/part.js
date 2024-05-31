"use client"; // Gibt an, dass dies eine Client-Seitenkomponente ist
import { useState, useEffect } from "react"; // Import von Hooks für Zustandsverwaltung und Seiteneffekte
import { Product } from "@/components/products"; // Import der Product-Komponente

export default function Home({ products }) {
  const [filter, setFilter] = useState({ price: "", name: "", category: "" }); // Zustand für die Filtereinstellungen
  const [filteredProducts, setFilteredProducts] = useState(products); // Zustand für die gefilterten Produkte

  // Effekt, der bei Änderungen an den Filtereinstellungen angewendet wird
  useEffect(() => {
    applyFilters(filter); // Anwenden der Filter
  }, [filter]);

  // Funktion zur Handhabung von Änderungen der Filtereingaben
  const handleFilterChange = (e) => {
    const { name, value } = e.target; // Extrahieren des Namens und Werts des Ziel-Eingabefelds
    setFilter({ ...filter, [name]: value }); // Aktualisieren der Filtereinstellungen
  };

  // Funktion zum Anwenden der Filter auf die Produktliste
  const applyFilters = (filter) => {
    let filtered = products;
    if (filter.price) {
      filtered = filtered.filter(
        (product) => product.price <= parseFloat(filter.price) // Filtern nach Preis
      );
    }
    if (filter.name) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(filter.name.toLowerCase()) // Filtern nach Name
      );
    }
    if (filter.category) {
      filtered = filtered.filter(
        (product) =>
          product.category.toLowerCase().includes(filter.category.toLowerCase()) // Filtern nach Kategorie
      );
    }
    setFilteredProducts(filtered); // Aktualisieren der gefilterten Produktliste
  };

  return (
    <main className="main-container">
      <aside className="sidebar">
        <h2>Produkte filtern</h2> {/* Geänderter Text */}
        <div className="filter-group">
          <label htmlFor="price">Maximalpreis</label> {/* Geänderter Text */}
          <input
            type="number"
            id="price"
            name="price"
            value={filter.price}
            onChange={handleFilterChange}
            placeholder="Maximalpreis eingeben"
          />
        </div>
        <div className="filter-group">
          <label htmlFor="name">Name</label> {/* Geänderter Text */}
          <input
            type="text"
            id="name"
            name="name"
            value={filter.name}
            onChange={handleFilterChange}
            placeholder="Produktname eingeben"
          />
        </div>
        <div className="filter-group">
          <label htmlFor="category">Kategorie</label> {/* Geänderter Text */}
          <input
            type="text"
            id="category"
            name="category"
            value={filter.category}
            onChange={handleFilterChange}
            placeholder="Kategorie eingeben"
          />
        </div>
      </aside>
      <div className="container">
        <section className="products">
          {filteredProducts &&
            filteredProducts.map((product) => {
              return <Product {...product} key={product.slug} />; // Rendern der gefilterten Produkte
            })}
        </section>
        <button className="load-more">Mehr laden</button>{" "}
        {/* Geänderter Text */}
      </div>
    </main>
  );
}
