'use client';

import Link from 'next/link';
import styles from './Footer.module.css';
import { FaWhatsapp } from 'react-icons/fa';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { config } from '@/lib/config';

export default function Footer() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.container}>
        <div className={styles.grid}>

          <div className={styles.column}>
            <h4>Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/dashboard">Dashboard</Link></li>
              {session && (
                <li>
                  <button onClick={handleSignOut} className={styles.logoutButton}>
                    Sign Out
                  </button>
                </li>
              )}
            </ul>
          </div>
          
          <div className={styles.column}>
            <h4>Contact Us</h4>
            <ul>
              <li>Email: {config.contactEmail}</li>
              <hr />
              <li className={styles.flexItem}>
                <a href={`tel:${config.contactPhone1?.replace(/\s+/g, '')}`}>{config.contactPhone1}</a>
                <div className={styles.socialLinks}>
                  <a
                    href={`https://wa.me/${config.contactPhone1?.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp 1"
                  >
                    <FaWhatsapp className={styles.socialIcon} />
                  </a>
                </div>
              </li>
              <hr />
              <li className={styles.flexItem}>
                <a href={`tel:${config.contactPhone2?.replace(/\s+/g, '')}`}>{config.contactPhone2}</a>
                <div className={styles.socialLinks}>
                  <a
                    href={`https://wa.me/${config.contactPhone2?.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp 2"
                  >
                    <FaWhatsapp className={styles.socialIcon} />
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h1 className={styles.brandName}>{config.marketName}</h1>
            <p className={styles.description}>{config.brandDescription}</p>
          </div>

        </div>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} {config.marketName} | All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}