"use client"; // Gibt an, dass dies eine Client-Seitenkomponente ist
import { useSession } from "next-auth/react"; // Import des useSession Hooks von next-auth zur Verwaltung der Benutzersitzung

export default function Header() {
  const { data: session } = useSession(); // Abrufen der Sitzungsdaten

  return (
    <header>
      <div className="container">
        <h1>{"CShop"}</h1> {/* Geänderter Titel der Seite */}
        <nav>
          <ul>
            <li>
              <a href="/#">Startseite</a> {/* Link zur Startseite */}
            </li>
            <li>
              <a href="/products">Produkte</a> {/* Link zur Produktseite */}
            </li>
            <li>
              <a href="/about">Über uns</a> {/* Link zur Über-uns-Seite */}
            </li>
            <li>
              <a href="/contact">Kontakt</a> {/* Link zur Kontaktseite */}
            </li>
            <li>
              {/* Überprüfung, ob der Benutzer eingeloggt ist */}
              {session?.user ? (
                <p>Willkommen, {session?.user?.username}</p>
              ) : (
                <a href="/auth/login">Anmelden</a>
              )}
            </li>
            <li>
              <a href="/cart">Warenkorb</a> {/* Link zur Warenkorbseite */}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
