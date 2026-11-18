import type { Metadata } from "next";
import { Archivo, Geist_Mono, Instrument_Serif } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], display: "swap" });
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "404 — Page not found",
  description: "This page does not exist or has moved.",
};

// Rendered for URLs that match no route, outside the localized layout,
// so it carries both languages.
export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${archivo.variable} ${instrument.variable} ${geistMono.variable} antialiased`}>
      <body className="site-frame site-frame-standalone poster min-h-svh">
        <main className="mx-auto flex min-h-svh max-w-[1320px] flex-col justify-center px-5 sm:px-10">
          <p className="label text-faint">404</p>
          <h1 className="display mt-5 text-[clamp(3.25rem,9vw,8rem)]">Page not found</h1>
          <p className="mt-6 text-xl text-muted">
            This page does not exist or has moved. <span lang="es">Esta página no existe o se movió.</span>
          </p>
          <p className="mt-10 flex flex-wrap gap-3">
            <Link href="/en" className="btn">
              ← Back to home
            </Link>
            <Link href="/es" lang="es" className="btn">
              ← Volver al inicio
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
