import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/",
  },
});

export const config = {
  matcher: [
    "/users/:path*",
    "/conversations/:path*",
    // * protect all sub url start with /users or /conversations
    // like /users/id
    // /conversations/id
    // /users/messages
  ],
};
