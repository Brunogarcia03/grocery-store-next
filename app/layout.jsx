"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { Toaster } from "@/components/ui/sonner";
import { usePathname } from "next/navigation";
import { updateCartContext } from "./_context/UpdateCartContext";
import { useState } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Footer from "./_components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Grocery Store E-commerce",
  description:
    "Buy the best products in our online store. Find a wide variety of quality items at competitive prices.",
};

export default function RootLayout({ children }) {
  const params = usePathname();
  const showHeader =
    params === "/sign-in" || params === "/create-account" ? false : true;

  const [updateCart, setUpdateCart] = useState(false);

  return (
    <PayPalScriptProvider
      options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}
    >
      <html lang="en">
        <body className={inter.className}>
          <updateCartContext.Provider value={{ updateCart, setUpdateCart }}>
            {showHeader && <Header />}
            {children}
            {showHeader && <Footer />}
            <Toaster />
          </updateCartContext.Provider>
        </body>
      </html>
    </PayPalScriptProvider>
  );
}
