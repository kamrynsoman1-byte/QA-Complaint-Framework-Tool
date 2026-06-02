import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QA Call Assistant Demo",
  description: "A lightweight QA call checklist demo for live complaint handling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
