import { config } from '@/lib/config';

export const metadata = {
  title: `${config.marketName} | Admin Login`,
  description: 'Admin login page for managing products and orders.',
};

export default function LoginLayout({ children }) {
  return children;
} 