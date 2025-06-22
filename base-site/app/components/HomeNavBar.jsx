'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './HomeNavBar.module.css';
import { config } from '@/lib/config';

export default function HomeNavBar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const router = useRouter();

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
          <img 
            src={config.logoUrl} 
            alt={`${config.marketName || 'Logo'}`} 
            className={styles.logoImage} 
          />
          <h3>{config.marketName || 'Market'}</h3>
        </a>
        
        <div className={styles.rightSection}>
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
        </div>
      </div>
    </nav>
  );
}
