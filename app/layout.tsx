import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import Nothing from "@/components/Nothing";
import { neobrutalism, dark } from "@clerk/themes";

const bodyfont = Montserrat({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "ScreenVerse - A Cinematic Junction",
  description:
    "Discover cinema like never before, explore friends and their recommendations, or make your own watchlist.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    //   <ClerkProvider
    //   appearance={{
    //     elements: {
    //       baseTheme: neobrutalism,
    //       formButtonPrimary: {
    //         fontSize: 14,
    //         textTransform: "none",
    //         backgroundColor: "#373737",
    //         "&:hover, &:focus, &:active": {
    //           backgroundColor: "#636363",
    //         },
    //       },
    //     },
    //   }}
    // >
    <ClerkProvider
      appearance={{
        baseTheme: neobrutalism,
      }}
    >
      <html lang="en">
        <body className={bodyfont.className}>
          <header>
            <Navbar />
            <Nothing />
          </header>
          <main> {children}</main>
          <footer>
            <Footer />
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
