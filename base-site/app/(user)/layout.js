import HomeNavBar from "../components/HomeNavBar";
import Footer from "../components/Footer";
import { config } from "@/lib/config";

export const metadata = {
  title: config.marketName ? `${config.marketName} | Company` : "Company",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <HomeNavBar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
