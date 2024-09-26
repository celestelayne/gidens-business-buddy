import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";


const isChatRoute = createRouteMatcher([
  '/chat(.*)'
]);

export default clerkMiddleware()

// export default clerkMiddleware((auth, req) => {
//   // redirects unauthenticated users to the sign-in route automatically.
//   if (isChatRoute(req)) auth().protect();
// }, { debug: true });

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    "/", 
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
