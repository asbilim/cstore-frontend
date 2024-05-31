import axios from "axios"; // Import von Axios für HTTP-Anfragen

const API_URL = "http://127.0.0.1:8000/store"; // Basis-URL für die API

// Funktion zum Abrufen des Warenkorbs von der API
export const getCart = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/carts/`, {
      headers: {
        Authorization: `Bearer ${token}`, // Autorisierungs-Header mit dem JWT-Token
      },
    });
    return response.data; // Rückgabe der Warenkorbdaten
  } catch (error) {
    // Fehlerbehandlung bei der Anfrage
    throw new Error(
      error.response ? error.response.data.detail : error.message // Fehlernachricht zurückgeben
    );
  }
};

// Funktion zum Hinzufügen eines Produkts zum Warenkorb
export const addProductToCart = async (token, productId) => {
  try {
    const response = await axios.post(
      `${API_URL}/cart/add_product/`,
      { product_id: productId, quantity: 1 }, // Produkt-ID und Menge in den Anfragekörper einfügen
      {
        headers: {
          Authorization: `Bearer ${token}`, // Autorisierungs-Header mit dem JWT-Token
        },
      }
    );
    return response.data; // Rückgabe der Antwortdaten
  } catch (error) {
    // Fehlerbehandlung bei der Anfrage
    throw new Error(
      error.response ? error.response.data.detail : error.message // Fehlernachricht zurückgeben
    );
  }
};

// Funktion zum Reduzieren der Produktmenge im Warenkorb
export const reduceProductInCart = async (token, productId) => {
  try {
    const response = await axios.post(
      `${API_URL}/cart/remove_product/`,
      { product_id: productId }, // Produkt-ID in den Anfragekörper einfügen
      {
        headers: {
          Authorization: `Bearer ${token}`, // Autorisierungs-Header mit dem JWT-Token
        },
      }
    );
    return response.data; // Rückgabe der Antwortdaten
  } catch (error) {
    // Fehlerbehandlung bei der Anfrage
    throw new Error(
      error.response ? error.response.data.detail : error.message // Fehlernachricht zurückgeben
    );
  }
};

// Funktion zum Entfernen eines Produkts aus dem Warenkorb
export const removeProductFromCart = async (token, productId) => {
  try {
    const response = await axios.post(
      `${API_URL}/cart/remove_product/`,
      { product_id: productId }, // Produkt-ID in den Anfragekörper einfügen
      {
        headers: {
          Authorization: `Bearer ${token}`, // Autorisierungs-Header mit dem JWT-Token
        },
      }
    );
    return response.data; // Rückgabe der Antwortdaten
  } catch (error) {
    // Fehlerbehandlung bei der Anfrage
    throw new Error(
      error.response ? error.response.data.detail : error.message // Fehlernachricht zurückgeben
    );
  }
};

// Funktion zum Hinzufügen eines Kommentars zu einem Produkt
export const addCommentToProduct = async (token, productId, content) => {
  try {
    const response = await axios.post(
      `${API_URL}/product/add_comment/`,
      { product_id: productId, content: content }, // Produkt-ID und Kommentarinhalt in den Anfragekörper einfügen
      {
        headers: {
          Authorization: `Bearer ${token}`, // Autorisierungs-Header mit dem JWT-Token
        },
      }
    );
    return response.data; // Rückgabe der Antwortdaten
  } catch (error) {
    // Fehlerbehandlung bei der Anfrage
    throw new Error(
      error.response ? error.response.data.detail : error.message // Fehlernachricht zurückgeben
    );
  }
};
