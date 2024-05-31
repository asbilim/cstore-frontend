"use client"; // Gibt an, dass dies eine Client-Seitenkomponente ist
import React from "react";
import { useForm } from "react-hook-form"; // Importieren des useForm Hooks von react-hook-form zur Formularverwaltung
import { toast, ToastContainer } from "react-toastify"; // Importieren der Toast-Funktionen zur Anzeige von Benachrichtigungen
import "react-toastify/dist/ReactToastify.css"; // Importieren der CSS-Datei für react-toastify-Benachrichtigungen
import axios from "axios";
import { useRouter } from "next/navigation";
const Login = () => {
  // Verwenden des useForm Hooks zur Verwaltung des Formularzustands und der Validierung
  const {
    register, // Funktion zum Registrieren von Eingabefeldern
    handleSubmit, // Funktion zur Formularübermittlung
    formState: { errors }, // Objekt, das Validierungsfehler enthält
  } = useForm({ mode: "onChange" }); // Initialisierung von useForm mit dem Modus "onChange"
  const router = useRouter();
  // Funktion zur Handhabung der Formularübermittlung
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/create/",
        data
      );
      console.log(response);
      toast.success("Anmeldung erfolgreich!"); // Anzeige einer Erfolgsbenachrichtigung
      router.push("/auth/login");
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Funktion zur Handhabung von Formularübermittlungsfehlern
  const onError = () => {
    toast.error(
      "Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben."
    ); // Anzeige einer Fehlermeldung
  };

  return (
    <div className="container login-container">
      {" "}
      {/* Container für das Anmeldeformular */}
      <div className="login-form">
        {" "}
        {/* Styling-Klasse für das Anmeldeformular */}
        <h1>Konto erstellen</h1> {/* Formularüberschrift */}
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          {" "}
          {/* Formularelement mit Übermittlungs-Handler */}
          <div className="form-group">
            {" "}
            {/* Container für Benutzernamen-Eingabe */}
            <label htmlFor="username">Benutzername</label>{" "}
            {/* Label für Benutzernamen-Eingabe */}
            <input
              type="text"
              id="username"
              {...register("username", {
                required: "Benutzername ist erforderlich",
              })} // Registrierung der Eingabe mit Validierungsregel
            />
            {errors.username && (
              <p className="error-message">{errors.username.message}</p> // Anzeige der Validierungsfehlermeldung
            )}
          </div>
          <div className="form-group">
            {" "}
            {/* Container für E-Mail-Eingabe */}
            <label htmlFor="email">E-Mail</label>{" "}
            {/* Label für E-Mail-Eingabe */}
            <input
              type="email"
              id="email"
              {...register("email", { required: "E-Mail ist erforderlich" })} // Registrierung der Eingabe mit Validierungsregel
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p> // Anzeige der Validierungsfehlermeldung
            )}
          </div>
          <div className="form-group">
            {" "}
            {/* Container für Passwort-Eingabe */}
            <label htmlFor="password">Passwort</label>{" "}
            {/* Label für Passwort-Eingabe */}
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Passwort ist erforderlich",
              })} // Registrierung der Eingabe mit Validierungsregel
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p> // Anzeige der Validierungsfehlermeldung
            )}
          </div>
          <button type="submit">Konto erstellen</button>{" "}
          {/* Schaltfläche zum Absenden */}
          <p>
            Haben Sie bereits ein Konto? <a href="/auth/login">Anmelden</a>{" "}
            {/* Link zur Anmeldeseite */}
          </p>
        </form>
      </div>
      <ToastContainer /> {/* Container für Toast-Benachrichtigungen */}
    </div>
  );
};

export default Login; // Export der Login-Komponente als Standardexport
