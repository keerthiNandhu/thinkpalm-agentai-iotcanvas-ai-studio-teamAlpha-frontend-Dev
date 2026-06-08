import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IoTCanvas AI Studio",
  description: "IoT Dashboard Generator powered by AI Agents",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
