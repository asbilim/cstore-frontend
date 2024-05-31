"use client"; // Gibt an, dass dies eine Client-Seitenkomponente ist
import React, { useState, useEffect } from "react";
import {
  getCart,
  addProductToCart,
  reduceProductInCart,
  removeProductFromCart,
} from "@/functions/api"; // Importieren von API-Funktionen zur Verwaltung des Warenkorbs
import Image from "next/image"; // Importieren der Image-Komponente von Next.js
import { useSession } from "next-auth/react"; // Importieren des useSession Hooks von next-auth zur Verwaltung der Benutzersitzung
import { toast, ToastContainer } from "react-toastify"; // Importieren der Toast-Funktionen zur Anzeige von Benachrichtigungen
import "react-toastify/dist/ReactToastify.css"; // Importieren der CSS-Datei für react-toastify-Benachrichtigungen

const Cart = () => {
  const { data: session } = useSession(); // Abrufen der Sitzungdaten
  const [cart, setCart] = useState([]); // Zustand für den Warenkorb
  const [cartId, setCartId] = useState(null); // Zustand für die Warenkorb-ID
  const [error, setError] = useState(false); // Zustand für Fehler

  // Funktion zum Hinzufügen eines Produkts zum Warenkorb
  const handleAdd = async (productId) => {
    try {
      const token = session?.accessToken; // Abrufen des Zugriffstokens aus der Sitzung
      await addProductToCart(token, cartId, productId); // Aufrufen der API-Funktion zum Hinzufügen des Produkts
      setCart(
        cart.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      toast.success("Produkt zum Warenkorb hinzugefügt"); // Anzeige einer Erfolgsbenachrichtigung
    } catch (e) {
      toast.error(
        "Produkt konnte nicht zum Warenkorb hinzugefügt werden: " + e.message
      ); // Anzeige einer Fehlermeldung
    }
  };

  // Funktion zum Reduzieren der Produktmenge im Warenkorb
  const handleReduce = async (productId) => {
    try {
      const token = session?.accessToken; // Abrufen des Zugriffstokens aus der Sitzung
      await reduceProductInCart(token, cartId, productId); // Aufrufen der API-Funktion zum Reduzieren der Produktmenge
      setCart(
        cart.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
            : item
        )
      );
      toast.success("Produktmenge reduziert"); // Anzeige einer Erfolgsbenachrichtigung
    } catch (e) {
      toast.error("Produktmenge konnte nicht reduziert werden: " + e.message); // Anzeige einer Fehlermeldung
    }
  };

  // Funktion zum Entfernen eines Produkts aus dem Warenkorb
  const handleRemove = async (productId) => {
    try {
      const token = session?.accessToken; // Abrufen des Zugriffstokens aus der Sitzung
      await removeProductFromCart(token, productId); // Aufrufen der API-Funktion zum Entfernen des Produkts
      setCart(cart.filter((item) => item.product.id !== productId)); // Aktualisieren des Warenkorbs
      toast.success("Produkt aus dem Warenkorb entfernt"); // Anzeige einer Erfolgsbenachrichtigung
    } catch (e) {
      toast.error(
        "Produkt konnte nicht aus dem Warenkorb entfernt werden: " + e.message
      ); // Anzeige einer Fehlermeldung
    }
  };

  // useEffect Hook zur Überprüfung der Sitzung und zum Abrufen des Warenkorbs
  useEffect(() => {
    const checkSession = () => {
      try {
        if (!session?.accessToken) {
          setError(true); // Fehlerzustand setzen, wenn kein Zugriffstoken vorhanden ist
        }
      } catch (e) {
        console.error(e);
      }
      return session?.accessToken; // Zugriffstoken zurückgeben
    };
    const token = checkSession();

    // Asynchrone Funktion zum Abrufen des Warenkorbs
    const get = async () => {
      try {
        const data = await getCart(token); // Abrufen der Warenkorbdaten
        if (data && !data.detail) {
          setCart(data[0].items); // Setzen der Warenkorbartikel
          setCartId(data[0].id); // Setzen der Warenkorb-ID
        }
      } catch (e) {
        toast.error(
          "Warenkorbdaten konnten nicht abgerufen werden: " + e.message
        ); // Anzeige einer Fehlermeldung
      }
    };
    get();
  }, [session]);

  // Berechnung des Gesamtpreises der Produkte im Warenkorb
  const totalPrice = cart?.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div className="container">
      <h1>Einkaufswagen</h1>
      {cart.length === 0 ? (
        <p>
          Ihr Warenkorb ist leer, bitte melden Sie sich an, um Ihren Warenkorb
          zu sehen
        </p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Produkt</th>
                <th>Preis</th>
                <th>Menge</th>
                <th>Gesamt</th>
                <th>Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.product.id}>
                  <td className="product-info">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      width="50"
                      height="50"
                    />
                    <span>{item.product.name}</span>
                  </td>
                  <td>${item.product.price}</td>
                  <td>{item.quantity}</td>
                  <td>${item.product.price * item.quantity}</td>
                  <td>
                    <button onClick={() => handleAdd(item.product.id)}>
                      +
                    </button>
                    <button onClick={() => handleReduce(item.product.id)}>
                      -
                    </button>
                    <button onClick={() => handleRemove(item.product.id)}>
                      Entfernen
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2>Gesamtpreis: ${totalPrice.toFixed(2)}</h2>
        </>
      )}
      <ToastContainer /> {/* Container für Toast-Benachrichtigungen */}
    </div>
  );
};

export default Cart;
