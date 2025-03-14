import { ThemeProvider } from "@/context/theme-provider";
import "./globals.css";

export const metadata = {
  title: "Manana",
  description: "Keep yourself organized with Manana",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
