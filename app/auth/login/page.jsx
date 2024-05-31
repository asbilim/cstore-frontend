"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [error, setError] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  // Funktion, die bei erfolgreicher Formularübermittlung aufgerufen wird
  const onSubmit = async (data) => {
    try {
      // Versuche, den Benutzer mit den angegebenen Anmeldeinformationen anzumelden
      const result = await signIn("credentials", { redirect: false, ...data });
      if (result.ok) {
        // Wenn die Anmeldung erfolgreich ist, zeige eine Erfolgsmeldung an und leite den Benutzer zu /products weiter
        toast.success("Anmeldung erfolgreich!");
        router.push("/products");
      } else {
        // Wenn die Anmeldung fehlschlägt, setze den Fehlerzustand
        setError(true);
      }
    } catch (err) {
      // Setze den Fehlerzustand auf die Fehlermeldung
      setError(err.message);
    }
  };

  // Funktion, die bei fehlerhafter Formularübermittlung aufgerufen wird
  const onError = () => {
    toast.error(
      "Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben."
    );
  };

  return (
    <div className="container login-container">
      <div className="login-form">
        <h1>Anmelden</h1>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="form-group">
            <label htmlFor="username">Benutzername</label>
            <input
              type="text"
              id="username"
              {...register("username", {
                required: "Benutzername ist erforderlich",
              })}
            />
            {errors.username && (
              <p className="error-message">{errors.username.message}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Passwort</label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Passwort ist erforderlich",
              })}
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>
          <button type="submit">Anmelden</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
