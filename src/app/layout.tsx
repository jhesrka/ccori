import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ccori Rosé - Yanbal",
  description: "Un aroma moderno y femenino que resalta tu esencia.",
  openGraph: {
    title: "Ccori Rosé - Yanbal",
    description: "Un aroma moderno y femenino que resalta tu esencia.",
    url: "https://ccori.vercel.app",
    siteName: "Ccori Rosé",
    images: [
      {
        url: "/ccori.jpeg",
        width: 1200,
        height: 630,
        alt: "Perfume Ccori Rosé - Yanbal",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ccori Rosé - Yanbal",
    description: "Un aroma moderno y femenino que resalta tu esencia.",
    images: ["/ccori.jpeg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
