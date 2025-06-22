'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './DashboardNavBar.module.css';
import { config } from '@/lib/config';

export default function DashboardNavBar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when clicking anywhere
  useEffect(() => {
    const handleClick = () => setIsMenuOpen(false);
    if (isMenuOpen) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [isMenuOpen]);

  const toggleMenu = (e) => {
    e.stopPropagation(); // Prevent immediate closing
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/dashboard" className={styles.logo}>
          <h3>{config.marketName}</h3>
        </Link>

        <div className={styles.menuContainer}>
          {/* Desktop Navigation */}
          <div className={styles.desktopNav}>
            <Link 
              href="/dashboard" 
              className={`${styles.navLink} ${pathname === '/dashboard' ? styles.active : ''}`}
            >
              Products
            </Link>
            <Link 
              href="/dashboard/categories" 
              className={`${styles.navLink} ${pathname === '/dashboard/categories' ? styles.active : ''}`}
            >
              Categories
            </Link>
          </div>

          {/* Mobile Navigation */}
          <button 
            className={`${styles.menuButton} ${isMenuOpen ? styles.menuOpen : ''}`}
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
              <path d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} strokeWidth="2" />
            </svg>
          </button>

          {isMenuOpen && (
            <div className={styles.menuDropdown}>
              <Link 
                href="/dashboard" 
                className={`${styles.navLink} ${pathname === '/dashboard' ? styles.active : ''}`}
              >
                Products
              </Link>
              <Link 
                href="/dashboard/categories" 
                className={`${styles.navLink} ${pathname === '/dashboard/categories' ? styles.active : ''}`}
              >
                Categories
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
