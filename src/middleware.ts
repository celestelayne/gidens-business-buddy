import { clerkMiddleware } from "@clerk/nextjs/server";

// This requires user to sign in to see any page or call any API route
export default clerkMiddleware();

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)", "/dashboard(.*)"],
};
