import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        const res = await fetch("http://localhost:6400/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.username,
            password: credentials?.password,
          }),
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message);
        }

        let user = await res.json();

        if (user) {
          console.log("kl");
          return {
            email: user.user.email,
            name: user.user.name,
            id: user.user.id,
            token: user.token,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = {
          ...token,
          email: user.email,
          name: user.name,
          image: user.image,
          id: user.id,
          token: user.token,
        };
      }
      return token;
    },
    async session({ session, user, token }) {
      const to = typeof token.token === "string" ? token.token : "";
      if (session.user) {
        session.user = { ...session.user, token: to };
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signIn",
  },
});
