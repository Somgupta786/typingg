import { NextAuthOptions, User, getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import axios from "axios";

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("hum called")
        if (!credentials || !credentials.email || !credentials.password)
          return null;
        // try {
        //   const response = await axios.post(
        //     "https://typing.varankit.tech/api/v1/auth/signIn",
        //     {
        //       email: credentials.email,
        //       password: credentials.password,
        //     },
        //     {
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //     }
        //   );

        //   // Assuming the API returns user data in response.data
        //   if (response.data) {
        //     return response.data; // Return the user data from the API
        //   }
        // } catch (error) {
        //   console.error("Error in authorization:", error);
        // }
        return;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
};

// export async function loginIsRequiredServer() {
//   const session = await getServerSession(authConfig);
//   if (!session) return redirect("/");
// }

// export function loginIsRequiredClient() {
//   if (typeof window !== "undefined") {
//     const session = useSession();
//     const router = useRouter();
//     if (!session) router.push("/dummy");
//   }
// }
