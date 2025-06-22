'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import styles from './clerk-auth.module.css';

export default function ClerkUserButton() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className={styles.userButton}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.userButton}>
        <a href="/login" className={styles.signInLink}>Sign In</a>
      </div>
    );
  }

  return (
    <div className={styles.userButton}>
      <div className={styles.userInfo}>
        <span className={styles.userName}>
          {user.firstName || user.emailAddresses[0]?.emailAddress}
        </span>
        {user.publicMetadata?.role === 'admin' && (
          <span className={styles.adminBadge}>Admin</span>
        )}
      </div>
      <UserButton 
        appearance={{
          elements: {
            userButtonAvatarBox: styles.avatarBox,
            userButtonPopoverCard: styles.popoverCard,
            userButtonPopoverActionButton: styles.popoverButton
          }
        }}
        afterSignOutUrl="/"
      />
    </div>
  );
} 