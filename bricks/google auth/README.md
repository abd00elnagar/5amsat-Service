# Google Auth Brick

This brick provides Google OAuth authentication using NextAuth.js with Google provider.

## Features
- Google OAuth 2.0 authentication
- Automatic user creation
- Role-based access control
- Session management
- Protected routes
- User profile management

## Installation

### 1. Install Dependencies
```bash
npm install next-auth @auth/google-provider
```

### 2. Environment Variables
Add to your `.env.local`:
```env
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 3. Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Set authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
6. Copy Client ID and Client Secret to your environment variables

### 4. Replace Base Auth Files
- Replace `lib/auth.js` with `google-auth.js`
- Update `app/api/auth/[...nextauth]/route.js` to use Google provider
- Update `middleware.js` to use NextAuth

### 5. Update Components
- Replace login page with `GoogleLoginPage.jsx`
- Add `GoogleUserButton.jsx` to navigation
- Update `providers.jsx` to include SessionProvider

### 6. Update Package.json
Add NextAuth and Google provider dependencies to your package.json

## Usage

### Protected Routes
```jsx
import { useSession } from 'next-auth/react';

export default function ProtectedPage() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  
  if (!session) {
    return <div>Please sign in</div>;
  }
  
  return <div>Welcome, {session.user.name}!</div>;
}
```

### User Information
```jsx
import { useSession } from 'next-auth/react';

export default function UserProfile() {
  const { data: session } = useSession();
  
  return (
    <div>
      <p>Hello, {session.user.name}!</p>
      <p>Email: {session.user.email}</p>
      <img src={session.user.image} alt="Profile" />
    </div>
  );
}
```

### Sign Out
```jsx
import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  return (
    <button onClick={() => signOut()}>
      Sign Out
    </button>
  );
}
```

## Configuration

### Custom Styling
The Google Auth components can be styled using CSS modules. See `google-auth.module.css` for examples.

### Admin Role Setup
1. In your database, create a users table with role field
2. Set admin users' role to "admin" in the database
3. Use the `useSession` hook to check roles

### Database Integration
The auth system automatically creates user records in your database. Make sure your database schema includes:
- `id` (string)
- `email` (string)
- `name` (string)
- `image` (string, optional)
- `role` (string, default: 'user')

## Migration from Credentials Auth
1. Export existing user data
2. Import users to your database
3. Update all auth references in your code
4. Test all protected routes

## Troubleshooting

### Common Issues
1. **Google OAuth errors**: Check your redirect URIs in Google Console
2. **Environment variables not loading**: Restart your development server
3. **Session not persisting**: Check NEXTAUTH_SECRET and NEXTAUTH_URL
4. **CORS errors**: Ensure your domain is properly configured

### Support
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [NextAuth.js Discord](https://discord.gg/ndAuth)

## How to Add This Brick

1. **Copy the Brick**  
   Place the `google auth` folder inside your `bricks/` directory.

2. **Install Dependencies**  
   ```bash
   npm install next-auth @auth/google-provider
   ```

3. **Set Environment Variables**  
   Add Google and NextAuth keys to your `.env.local` as described in the README.

4. **Google OAuth Setup**  
   - Set up OAuth credentials in Google Cloud Console.
   - Add redirect URIs.

5. **Replace Auth Files**  
   - Replace `lib/auth.js` with `google-auth.js`
   - Update `app/api/auth/[...nextauth]/route.js` to use Google provider
   - Update `middleware.js` to use NextAuth

6. **Update Components**  
   - Use `GoogleLoginPage.jsx` for login
   - Add `GoogleUserButton.jsx` to navigation
   - Update `providers.jsx` to include `SessionProvider`

7. **Update `package.json`**  
   Add NextAuth and Google provider dependencies.

8. **Test Integration**  
   - Test protected routes and user flows. 