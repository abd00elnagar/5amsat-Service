import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Public routes that don't require authentication
  publicRoutes: [
    "/",
    "/products",
    "/products/(.*)",
    "/api/products",
    "/api/products/(.*)",
    "/login",
    "/signup",
    "/_next/(.*)",
    "/favicon.ico",
    "/api/webhook/clerk",
  ],
  
  // Routes that are always accessible to signed-in users
  ignoredRoutes: [
    "/api/webhook/clerk",
  ],
  
  // Custom redirect after sign in
  afterAuth(auth, req) {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      const signInUrl = new URL('/login', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return Response.redirect(signInUrl);
    }
    
    // Handle admin routes
    if (auth.userId && req.nextUrl.pathname.startsWith('/dashboard')) {
      // You can add admin role checking here
      // const user = await clerkClient.users.getUser(auth.userId);
      // if (user.publicMetadata?.role !== 'admin') {
      //   return Response.redirect(new URL('/', req.url));
      // }
    }
  },
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
}; 