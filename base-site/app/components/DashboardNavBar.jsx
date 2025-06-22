'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import config from '@/lib/config';
import styles from './DashboardNavBar.module.css';

export default function DashboardNavBar() {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/dashboard" className={styles.logo}>
          <img 
            src={config.logoUrl} 
            alt={`${config.marketName || 'Logo'}`} 
            className={styles.logoImage} 
          />
          <h3>UNATEED</h3>
        </Link>

        <div className={styles.links}>
          <Link 
            href="/dashboard" 
            className={`${styles.navLink} ${pathname === '/dashboard' ? styles.active : ''}`}
          >
            Products
          </Link>
        </div>
      </div>
    </nav>
  );
}
