import { Providers } from "@/context/provider";
import "./globals.css";

export const metadata = {
  title: "Manana",
  description: "Keep yourself organized with Manana",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}