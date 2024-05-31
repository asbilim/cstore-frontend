"use client"; // Gibt an, dass dies eine Client-Seitenkomponente ist
import { useState } from "react";

const ContactUs = () => {
  // Zustand für die Formulardaten
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Zustand für den Formularstatus
  const [formStatus, setFormStatus] = useState(null);

  // Funktion zum Aktualisieren der Formulardaten bei Änderungen in den Eingabefeldern
  const handleChange = (e) => {
    const { name, value } = e.target; // Extrahieren des Namens und Werts des Ziel-Eingabefelds
    setFormData({ ...formData, [name]: value }); // Aktualisieren der Formulardaten
  };

  // Funktion zum Handhaben der Formularübermittlung
  const handleSubmit = (e) => {
    e.preventDefault(); // Verhindern des Standard-Formularverhaltens
    // Formularübermittlung behandeln (z.B. Daten an eine API senden)
    console.log("Formular übermittelt:", formData);
    setFormStatus("Ihre Nachricht wurde erfolgreich gesendet."); // Setzen des Formularstatus
    // Zurücksetzen der Formulardaten
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="container">
      <div className="contact-us">
        <h1>Kontaktieren Sie uns</h1> {/* Formularüberschrift */}
        <p>
          Wir würden uns freuen, von Ihnen zu hören! Wenn Sie Fragen, Kommentare
          oder Feedback haben, zögern Sie nicht, uns über das untenstehende
          Formular zu kontaktieren.
        </p>
        <form onSubmit={handleSubmit}>
          {" "}
          {/* Formularelement mit Übermittlungs-Handler */}
          <div className="form-group">
            {" "}
            {/* Container für Namens-Eingabe */}
            <label htmlFor="name">Name</label> {/* Label für Namens-Eingabe */}
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name} // Wert des Eingabefelds aus dem Zustand
              onChange={handleChange} // Änderungs-Handler
              required // Pflichtfeld
            />
          </div>
          <div className="form-group">
            {" "}
            {/* Container für E-Mail-Eingabe */}
            <label htmlFor="email">E-Mail</label>{" "}
            {/* Label für E-Mail-Eingabe */}
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email} // Wert des Eingabefelds aus dem Zustand
              onChange={handleChange} // Änderungs-Handler
              required // Pflichtfeld
            />
          </div>
          <div className="form-group">
            {" "}
            {/* Container für Nachrichten-Eingabe */}
            <label htmlFor="message">Nachricht</label>{" "}
            {/* Label für Nachrichten-Eingabe */}
            <textarea
              id="message"
              name="message"
              value={formData.message} // Wert des Eingabefelds aus dem Zustand
              onChange={handleChange} // Änderungs-Handler
              required></textarea>{" "}
            {/* Pflichtfeld */}
          </div>
          <button type="submit">Absenden</button>{" "}
          {/* Schaltfläche zum Absenden */}
          {formStatus && <p className="form-status">{formStatus}</p>}{" "}
          {/* Anzeige des Formularstatus */}
        </form>
        <div className="contact-info">
          {" "}
          {/* Container für Kontaktinformationen */}
          <h2>Unsere Kontaktinformationen</h2>
          <ul>
            <li>Email: support@cshop.com</li> {/* Geänderte E-Mail-Adresse */}
            <li>Telefon: (123) 456-7890</li> {/* Telefonnummer */}
            <li>Adresse: 123 Telefonweg, Technologiestadt, WR 56789</li>{" "}
            {/* Geänderte Adresse */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactUs; // Export der ContactUs-Komponente als Standardexport
