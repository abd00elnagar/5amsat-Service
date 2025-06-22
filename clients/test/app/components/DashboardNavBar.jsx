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
          <img src={config.logoUrl || '/logo.png'} alt={config.marketName + ' Logo'} className={styles.logoImage} />
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

          {/* Mobile Menu Button */}
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

          {/* Mobile Navigation Dropdown */}
          {isMenuOpen && (
            <div className={styles.mobileNav}>
              <Link 
                href="/dashboard" 
                className={`${styles.navLink} ${pathname === '/dashboard' ? styles.active : ''}`}
              >
                <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
                Products
              </Link>
              <Link 
                href="/dashboard/categories" 
                className={`${styles.navLink} ${pathname === '/dashboard/categories' ? styles.active : ''}`}
              >
                <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
                Categories
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
