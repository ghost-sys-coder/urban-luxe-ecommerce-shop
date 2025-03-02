import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { UserProvider } from "@/providers/context/UserContext";
import "./globals.css";
import { CategoryProvider } from "@/providers/context/CategoriesContext";
import { ProductProvider } from "@/providers/context/ProductsContext";
import { LocationProvider } from "@/providers/context/LocationContext";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Urban Luxe",
  description: "Ecommerce store for quality fashion, and electronic products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${poppins.className} antialiased`}
        >
          <UserProvider>
            <ProductProvider>
              <LocationProvider>
                <CategoryProvider>
                  <main>{children}</main>
                </CategoryProvider>
              </LocationProvider>
            </ProductProvider>
          </UserProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
