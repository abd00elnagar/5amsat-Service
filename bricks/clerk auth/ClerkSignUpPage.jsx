'use client';

import { SignUp } from '@clerk/nextjs';
import styles from './clerk-auth.module.css';

export default function ClerkSignUpPage() {
  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Create Account</h1>
        <p className={styles.subtitle}>Join us today</p>
        
        <div className={styles.clerkContainer}>
          <SignUp 
            appearance={{
              elements: {
                formButtonPrimary: styles.clerkButton,
                card: styles.clerkCard,
                headerTitle: styles.clerkHeaderTitle,
                headerSubtitle: styles.clerkHeaderSubtitle,
                socialButtonsBlockButton: styles.clerkSocialButton,
                formFieldInput: styles.clerkInput,
                formFieldLabel: styles.clerkLabel,
                footerActionLink: styles.clerkLink
              }
            }}
            redirectUrl="/dashboard"
            signInUrl="/login"
          />
        </div>
        
        <div className={styles.footer}>
          <p>Already have an account? <a href="/login" className={styles.link}>Sign in</a></p>
        </div>
      </div>
    </div>
  );
} 