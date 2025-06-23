import { Inter } from 'next/font/google';
import Footer from "../../components/Footer";
import DashboardNavBar from '@/app/components/DashboardNavBar';
import '../../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Admin dashboard for managing products',
};

export default function DashboardLayout({ children }) {
  return (
    <>
        <DashboardNavBar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
    </>
  );
}
