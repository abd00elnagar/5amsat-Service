'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './HomeNavBar.module.css';
import { config } from '@/lib/config';

export default function HomeNavBar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (status === 'authenticated' && pathname === '/login') {
      router.replace('/dashboard');
    }
  }, [status, pathname, router]);

  // Close menu when clicking anywhere
  useEffect(() => {
    const handleClick = () => setMenuOpen(false);
    if (menuOpen) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [menuOpen]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  const toggleMenu = (e) => {
    e.stopPropagation(); // Prevent immediate closing
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <a className={styles.leftSection} href="/">
          <h2>{config.marketName}</h2>
        </a>

        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
          <Link 
            href="/#products" 
            className={`${styles.navLink} ${pathname === '/#products' ? styles.active : ''}`}
          >
            Our Products
          </Link>
          <Link 
            href="#footer" 
            className={styles.navLink}
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className={styles.mobileNav}>
          <button 
            className={`${styles.menuButton} ${menuOpen ? styles.menuOpen : ''}`} 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            Menu
            <svg 
              className={styles.menuIcon} 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
            >
              <path d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} strokeWidth="2" />
            </svg>
          </button>

          {menuOpen && (
            <div className={styles.menuDropdown}>
              <Link 
                href="/#products" 
                className={`${styles.navLink} ${pathname === '/#products' ? styles.active : ''}`}
              >
                Our Products
              </Link>
              <Link 
                href="#footer" 
                className={styles.navLink}
              >
                Contact Us
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
