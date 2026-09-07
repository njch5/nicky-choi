import type { Metadata } from "next";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Nicky Choi",
    template: "%s | Nicky Choi",
  },
  description: "Personal website of Nicky Choi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen">
          <main className="pb-28">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
