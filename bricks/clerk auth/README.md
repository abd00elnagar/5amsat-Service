# Clerk Auth Brick

This brick provides authentication using Clerk, a modern authentication and user management service.

## Features
- Social login (Google, Facebook, GitHub, etc.)
- Email/password authentication
- User profile management
- Protected routes
- Admin role management
- User dashboard

## Installation

### 1. Install Dependencies
```bash
npm install @clerk/nextjs
```

### 2. Environment Variables
Add to your `.env.local`:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
CLERK_SECRET_KEY=sk_test_your_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### 3. Replace Base Auth Files
- Replace `lib/auth.js` with `clerk-auth.js`
- Replace `app/api/auth/[...nextauth]/route.js` with Clerk middleware
- Update `middleware.js` to use Clerk

### 4. Update Components
- Replace login page with `ClerkLoginPage.jsx`
- Add `ClerkUserButton.jsx` to navigation
- Update `providers.jsx` to include ClerkProvider

### 5. Update Package.json
Add Clerk dependency to your package.json

## Usage

### Protected Routes
```jsx
import { auth } from '@clerk/nextjs';

export default function ProtectedPage() {
  const { userId } = auth();
  
  if (!userId) {
    return <div>Please sign in</div>;
  }
  
  return <div>Protected content</div>;
}
```

### User Information
```jsx
import { useUser } from '@clerk/nextjs';

export default function UserProfile() {
  const { user } = useUser();
  
  return (
    <div>
      <p>Hello, {user.firstName}!</p>
      <p>Email: {user.emailAddresses[0].emailAddress}</p>
    </div>
  );
}
```

## Configuration

### Custom Styling
The Clerk components can be styled using CSS modules or Tailwind CSS. See `clerk-auth.module.css` for examples.

### Admin Role Setup
1. In Clerk Dashboard, create a custom field called "role"
2. Set admin users' role to "admin"
3. Use the `useUser` hook to check roles

### Social Providers
Enable social providers in your Clerk Dashboard:
- Google
- Facebook
- GitHub
- Twitter
- And more...

## Migration from NextAuth
1. Export user data from NextAuth
2. Import users to Clerk Dashboard
3. Update all auth references in your code
4. Test all protected routes

## Troubleshooting

### Common Issues
1. **Environment variables not loading**: Restart your development server
2. **CORS errors**: Check your Clerk domain settings
3. **Styling issues**: Ensure CSS modules are properly configured

### Support
- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Discord](https://discord.gg/clerk) 