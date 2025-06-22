'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

export default function ClerkAuthProvider({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#3b82f6',
          colorBackground: '#1f2937',
          colorInputBackground: '#374151',
          colorInputText: '#f9fafb',
          colorText: '#f9fafb',
          colorTextSecondary: '#d1d5db',
          colorTextOnPrimaryBackground: '#ffffff',
          colorSuccess: '#10b981',
          colorDanger: '#ef4444',
          colorWarning: '#f59e0b',
          borderRadius: '8px',
          fontFamily: 'Inter, system-ui, sans-serif',
        },
        elements: {
          formButtonPrimary: {
            backgroundColor: '#3b82f6',
            '&:hover': {
              backgroundColor: '#2563eb',
            },
          },
          card: {
            backgroundColor: '#1f2937',
            border: '1px solid #374151',
          },
          headerTitle: {
            color: '#f9fafb',
          },
          headerSubtitle: {
            color: '#d1d5db',
          },
          socialButtonsBlockButton: {
            backgroundColor: '#374151',
            border: '1px solid #4b5563',
            '&:hover': {
              backgroundColor: '#4b5563',
            },
          },
          formFieldInput: {
            backgroundColor: '#374151',
            border: '1px solid #4b5563',
            color: '#f9fafb',
            '&:focus': {
              borderColor: '#3b82f6',
            },
          },
          formFieldLabel: {
            color: '#d1d5db',
          },
          footerActionLink: {
            color: '#3b82f6',
            '&:hover': {
              color: '#2563eb',
            },
          },
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
} 