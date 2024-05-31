// Funktion zum Abrufen der Produkte von der API
export const getProducts = async () => {
  const path = process.env.BACKEND_URL + process.env.PRODUCT_URL; // Zusammenstellen des API-Endpunkts aus Umgebungsvariablen
  try {
    const response = await fetch(path, {
      next: { revalidate: 120, tags: ["products"] }, // Option zur Revalidierung und Cache-Tags
    });
    const data = await response.json(); // Konvertieren der Antwort in JSON
    return data; // Rückgabe der Produktdaten
  } catch (err) {
    console.log(err.message); // Fehlerprotokollierung bei einem Fehler
    return false; // Rückgabe von false im Fehlerfall
  }
};

// Funktion zum Abrufen des Warenkorbs von der API
export const getCart = async (token) => {
  const path = "http://127.0.0.1:8000/store/carts"; // API-Endpunkt für den Warenkorb
  try {
    const response = await fetch(path, {
      next: { revalidate: 120, tags: ["products"] }, // Option zur Revalidierung und Cache-Tags
      headers: {
        "Content-Type": "application/json", // Festlegen des Content-Types
        Authorization: `Bearer ${token}`, // Autorisierungs-Header mit dem JWT-Token
      },
    });
    const data = await response.json(); // Konvertieren der Antwort in JSON
    return data; // Rückgabe der Warenkorbdaten
  } catch (err) {
    console.log(err.message); // Fehlerprotokollierung bei einem Fehler
    return false; // Rückgabe von false im Fehlerfall
  }
};
