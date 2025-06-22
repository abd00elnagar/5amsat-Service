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

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <a className={styles.leftSection} href="/">
          <img src={config.logoUrl || '/logo.png'} alt={config.marketName || 'Logo'} className={styles.logoImage} />
          <h3>{config.marketName}</h3>
        </a>
        <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>
        <div className={`${styles.rightSection} ${menuOpen ? styles.open : ''}`}>
          <Link 
            href="/" 
            className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}
          >
            Our Products
          </Link>
          <Link 
            href="#footer" 
            className={`${styles.navLink} ${pathname === '#footer' ? styles.active : ''}`}
          >
            Contact Us
          </Link>
          <div className={styles.userSection}>
            {/* Placeholder for user avatar or login button */}
            <Link href="/login" className={styles.userButton}>
              {session ? 'Account' : 'Login'}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
