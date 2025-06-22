'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState, useRef, useEffect } from 'react';
import styles from './google-auth.module.css';

export default function GoogleUserButton() {
  const { data: session, status } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (status === 'loading') {
    return (
      <div className={styles.userButton}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className={styles.userButton}>
        <a href="/login" className={styles.signInLink}>Sign In</a>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div className={styles.userButton} ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={styles.userButtonTrigger}
      >
        <div className={styles.userInfo}>
          <span className={styles.userName}>
            {session.user.name || session.user.email}
          </span>
          {session.user.role === 'admin' && (
            <span className={styles.adminBadge}>Admin</span>
          )}
        </div>
        <div className={styles.userAvatar}>
          {session.user.image ? (
            <img
              src={session.user.image}
              alt={session.user.name}
              className={styles.avatarImage}
            />
          ) : (
            <div className={styles.avatarPlaceholder}>
              {session.user.name?.charAt(0) || session.user.email?.charAt(0)}
            </div>
          )}
        </div>
      </button>

      {isDropdownOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownHeader}>
            <div className={styles.dropdownUserInfo}>
              <span className={styles.dropdownUserName}>
                {session.user.name}
              </span>
              <span className={styles.dropdownUserEmail}>
                {session.user.email}
              </span>
            </div>
          </div>
          
          <div className={styles.dropdownDivider}></div>
          
          <div className={styles.dropdownMenu}>
            <a href="/dashboard" className={styles.dropdownItem}>
              <svg className={styles.dropdownIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Dashboard
            </a>
            
            <a href="/profile" className={styles.dropdownItem}>
              <svg className={styles.dropdownIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </a>
            
            <button onClick={handleSignOut} className={styles.dropdownItem}>
              <svg className={styles.dropdownIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 