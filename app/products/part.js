"use client"; // Gibt an, dass dies eine Client-Seitenkomponente ist
import { useEffect, useState } from "react"; // Import von Hooks für Zustandsverwaltung und Seiteneffekte
import Image from "next/image"; // Import der Image-Komponente von Next.js
import { useRouter } from "next/navigation"; // Import des useRouter Hooks von Next.js
import { toast, ToastContainer } from "react-toastify"; // Import der Toast-Benachrichtigungen
import "react-toastify/dist/ReactToastify.css"; // Import der CSS-Datei für react-toastify-Benachrichtigungen
import { useSession } from "next-auth/react"; // Import des useSession Hooks von next-auth zur Verwaltung der Benutzersitzung
import { addProductToCart, addCommentToProduct } from "@/functions/api"; // Import der API-Funktionen

const ProductDetail = (props) => {
  const router = useRouter(); // Initialisierung des useRouter Hooks
  const { data: session } = useSession(); // Abrufen der Sitzungsdaten
  const [added, setAdded] = useState(false); // Zustand für die Anzeige, ob ein Produkt hinzugefügt wurde

  // Funktion zum Hinzufügen eines Produkts zum Warenkorb
  const handleAdd = async (productId) => {
    console.log(productId);
    try {
      const token = session?.accessToken; // Abrufen des Zugriffstokens aus der Sitzung
      await addProductToCart(token, productId); // Aufrufen der API-Funktion zum Hinzufügen des Produkts
      setAdded(true); // Setzen des Zustands für hinzugefügtes Produkt
      toast.success("Produkt zum Warenkorb hinzugefügt"); // Anzeige einer Erfolgsbenachrichtigung
    } catch (e) {
      router.push("/auth/login"); // Weiterleiten zur Login-Seite bei Fehler
      toast.error("Fehler: " + e.message); // Anzeige einer Fehlermeldung
    }
  };

  // Funktion zum Hinzufügen eines Kommentars zum Produkt
  const handleAddComment = async (e, productId) => {
    e.preventDefault(); // Verhindern des Standard-Formularverhaltens
    try {
      const token = session?.accessToken; // Abrufen des Zugriffstokens aus der Sitzung
      await addCommentToProduct(token, productId, newComment); // Aufrufen der API-Funktion zum Hinzufügen des Kommentars
      setAdded(true); // Setzen des Zustands für hinzugefügten Kommentar
      toast.success("Kommentar erfolgreich hinzugefügt"); // Anzeige einer Erfolgsbenachrichtigung
      if (newComment.trim()) {
        setComments([
          ...comments,
          { user: session?.user, content: newComment },
        ]); // Aktualisieren der Kommentare
        setNewComment(""); // Zurücksetzen des neuen Kommentars
      }
    } catch (e) {
      router.push("/auth/login"); // Weiterleiten zur Login-Seite bei Fehler
      toast.error("Fehler: " + e.message); // Anzeige einer Fehlermeldung
    }
  };

  const [rating, setRating] = useState(3); // Zustand für die Bewertung
  const [comments, setComments] = useState([]); // Zustand für die Kommentare
  const [newComment, setNewComment] = useState(""); // Zustand für den neuen Kommentar

  // useEffect Hook zum Setzen der Kommentare beim Laden der Komponente
  useEffect(() => {
    setComments(props?.comments);
  }, [props]);

  // Funktion zum Handhaben der Bewertungsklicks
  const handleRatingClick = (index) => {
    setRating(index + 1); // Setzen der Bewertung
  };

  // Funktion zum Hinzufügen eines Produkts zum Warenkorb (wird nicht verwendet)
  const handleAddToCart = () => {
    alert("Zum Warenkorb hinzugefügt!");
  };

  // Funktion zum Handhaben der Kommentarübermittlung
  const handleCommentSubmit = (e) => {
    e.preventDefault(); // Verhindern des Standard-Formularverhaltens
    if (newComment.trim()) {
      setComments([...comments, { user: "Sie", text: newComment }]); // Hinzufügen des neuen Kommentars zur Liste
      setNewComment(""); // Zurücksetzen des neuen Kommentars
    }
  };

  return (
    <div className="container shop-container">
      <ToastContainer autoClose={200} />{" "}
      {/* Container für Toast-Benachrichtigungen */}
      <button className="add-to-cart go-back" onClick={() => router.push("/")}>
        {"<- Zurück"}
      </button>
      <div className="product-detail">
        <div className="product-image">
          <Image
            width="1000"
            height="1000"
            src={props.image || "https://via.placeholder.com/500x400"}
            alt="Produkt"
          />
        </div>
        <div className="product-info">
          <h2>{props.name}</h2>
          <p className="price">${props.price}</p>
          <p className="description">{props.description}</p>
          <div className="rating">
            <span>Bewertung:</span>
            <span className="stars">
              {[...Array(5)].map((star, index) => (
                <span
                  key={index}
                  className={index < rating ? "star-filled" : "star-empty"}
                  onClick={() => handleRatingClick(index)}>
                  ★
                </span>
              ))}
            </span>
          </div>
          <button className="add-to-cart" onClick={() => handleAdd(props.id)}>
            In den Warenkorb
          </button>
          {added && (
            <button
              className="add-to-cart"
              onClick={() => router.push("/cart")}>
              Warenkorb ansehen
            </button>
          )}
        </div>
      </div>
      <div className="comments-section">
        <h3>Kommentare</h3>
        <ul className="comments-list">
          {comments?.length &&
            comments.map((comment, index) => (
              <li key={index}>
                <p>
                  <strong>{comment.user.username}:</strong> {comment.content}
                </p>
              </li>
            ))}
          {!comments?.length && <p>Noch keine Kommentare!</p>}
        </ul>
        <form
          className="add-comment"
          onSubmit={(e) => handleAddComment(e, props.id)}>
          <textarea
            placeholder="Einen Kommentar hinzufügen..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}></textarea>
          <button type="submit">Absenden</button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetail; // Export der ProductDetail-Komponente als Standardexport
