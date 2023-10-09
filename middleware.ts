import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/movie",
    "/movie/:id",
    "/tv",
    "/tv/:id",
    "/genres",
    "/genres/:id",
    "/genres/:id/:id",
    "/tv/genres",
    "/tv/genres/:id",
    "/tv/genres/:id/:id",
    "/people",
    "/people/:id",
    "/search",
    "/search/api",

    "/discover",
    "/discover/:id",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
