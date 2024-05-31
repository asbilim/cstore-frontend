import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Konfiguration von NextAuth
const auth = NextAuth({
  // Definition der Anmeldeanbieter
  providers: [
    // Verwendung von Anmeldeinformationen als Anbieter
    CredentialsProvider({
      name: "Anmeldeinformationen",
      credentials: {
        username: {
          label: "Benutzername",
          type: "text",
          placeholder: "jsmith",
        },
        password: { label: "Passwort", type: "password" },
      },
      // Autorisierungsfunktion
      async authorize(credentials, req) {
        // Senden einer Anfrage an die Backend-API zur Überprüfung der Anmeldeinformationen
        const res = await fetch(`${process.env.BACKEND_URL}/api/auth/login/`, {
          method: "POST",
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
          headers: { "Content-Type": "application/json" },
        });
        // Erhalt der Benutzerinformationen von der API
        const user = await res.json();

        // Überprüfen, ob die Antwort erfolgreich ist und der Benutzer existiert
        if (res.ok && user) {
          return user; // Rückgabe des Benutzerobjekts, wenn die Anmeldung erfolgreich war
        }

        return null; // Rückgabe von null, wenn die Anmeldung fehlgeschlagen ist
      },
    }),
  ],
  // Definition der Seiten für die Authentifizierung
  pages: {
    signIn: "/auth/login/", // Seite für die Anmeldung
  },
  // Definition der Rückrufe
  callbacks: {
    // Rückruf für JWT-Token
    async jwt({ token, user }) {
      // Wenn das Benutzerobjekt existiert, war die Anmeldung erfolgreich
      if (user) {
        token.accessToken = user.access; // Hinzufügen des Zugriffstokens zum JWT
        token.refreshToken = user.refresh; // Hinzufügen des Aktualisierungstokens zum JWT
      }
      return token; // Rückgabe des aktualisierten Tokens
    },
    // Rückruf für die Sitzung
    async session({ session, token }) {
      // Übergeben des JWT und weiterer Benutzerdetails an die Sitzung
      session.accessToken = token.accessToken; // Hinzufügen des Zugriffstokens zur Sitzung
      session.refreshToken = token.refreshToken; // Hinzufügen des Aktualisierungstokens zur Sitzung

      // Abrufen der Benutzerdaten
      const userDataPath = process.env.NEXT_PUBLIC_USER_PATH;

      // Senden einer Anfrage an die Backend-API zum Abrufen der Benutzerinformationen
      const res = await fetch(`${process.env.BACKEND_URL}/api/auth/infos/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.accessToken}`, // Autorisierung mit dem Zugriffstoken
        },
      });
      const user = await res.json(); // Erhalt der Benutzerinformationen von der API

      // Hinzufügen der Benutzerdetails zur Sitzung
      session.user = {};
      session.user.id = user[0].id; // Benutzer-ID zur Sitzung hinzufügen
      session.user.username = user[0].username; // Benutzername zur Sitzung hinzufügen

      return session; // Rückgabe der aktualisierten Sitzung
    },
  },
});

export { auth as GET, auth as POST }; // Export der Authentifizierungsfunktion für GET- und POST-Anfragen
