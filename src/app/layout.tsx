import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TourFlow — Tourism Operating System",
  description: "Digitize your tourism business. B2C bookings, B2B portal, internal CRM, AI assistance.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
