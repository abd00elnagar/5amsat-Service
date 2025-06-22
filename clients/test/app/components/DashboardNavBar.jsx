'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './DashboardNavBar.module.css';
import { config } from '@/lib/config';

export default function DashboardNavBar() {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/dashboard" className={styles.logo}>
          <img src={config.logoUrl || '/logo.png'} alt={config.marketName + ' Logo'} className={styles.logoImage} />
          <h3>{config.marketName}</h3>
        </Link>

        <div className={styles.links}>
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
      </div>
    </nav>
  );
}
