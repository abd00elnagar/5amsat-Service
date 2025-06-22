'use client';

import { SignIn } from '@clerk/nextjs';
import styles from './clerk-auth.module.css';

export default function ClerkLoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Sign in to your account</p>
        
        <div className={styles.clerkContainer}>
          <SignIn 
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
            signUpUrl="/signup"
          />
        </div>
        
        <div className={styles.footer}>
          <p>Don't have an account? <a href="/signup" className={styles.link}>Sign up</a></p>
        </div>
      </div>
    </div>
  );
} 