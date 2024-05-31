import { Indie_Flower as Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { AuthProvider } from "@/components/providers/next-auth";
import Footer from "@/components/footer";
const inter = Inter({ subsets: ["latin"], weight: ["400"], preload: true });

export const metadata = {
  title: "Cabrel's Store",
  description: "Buy and shop on my store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <AuthProvider>
        <body className={inter.className + " flex flex-col gap-15"}>
          <Header />
          {children}
          <Footer />
        </body>
      </AuthProvider>
    </html>
  );
}
