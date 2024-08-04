import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isChatRoute = createRouteMatcher([
  '/chat(.*)'
]);

export default clerkMiddleware((auth, req) => {
  // redirects unauthenticated users to the sign-in route automatically.
  if (isChatRoute(req)) auth().protect();
}, { debug: true });

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
