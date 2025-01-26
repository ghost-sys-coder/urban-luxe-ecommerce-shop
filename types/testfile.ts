import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define public routes
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/', '/api/webhooks(.*)']);

// Clerk middleware
export default clerkMiddleware(async (auth, request) => {
  // Protect routes that are not public
  if (!isPublicRoute(request)) {
    await auth.protect();
  }

  // check for admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const { sessionClaims } = await auth();
    const role = sessionClaims?.metadata?.role;

    const url = new URL("/", request.url);

    if (role !== "admin") {
      NextResponse.redirect(url);
    }
  }
});


// Next.js configuration for route matching
export const config = {
  matcher: [
    // Protect all admin routes explicitly
    '/admin(.*)',
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};