import HomeNavBar from "../components/HomeNavBar";
import Footer from "../components/Footer";
import { config } from "@/lib/config";

export const metadata = {
  title: `${config.marketName} | Home`,
  description: config.brandDescription || 'Discover our best products and services.',
};

export default async function RootLayout({ children }) {
  return (
    <>
        <HomeNavBar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
    </>
  );
}
