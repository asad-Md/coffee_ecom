import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // console.log("JWT Callback :", token);

      if (user) {
        token.userId = user.id;
      }
      return token;
    },
    // async signIn({ user }) {
    //   console.log("SignIn Callback - User:", user);

    //   if (!user?.email) {
    //     console.error("SignIn Error: User email is missing!");
    //     return false;
    //   }

    //   try {
    //     // Use a direct transaction to ensure database operations complete
    //     await prisma.$transaction(async (tx) => {
    //       let existingUser = await tx.user.findUnique({
    //         where: { email: user.email },
    //         include: { cart: true, orders: true },
    //       });

    //       if (!existingUser) {
    //         console.log("Creating new user...");
    //         existingUser = await tx.user.create({
    //           data: {
    //             email: user.email,
    //             name: user.name || "New User",
    //             image: user.image || null,
    //             cart: { create: {} },
    //           },
    //           include: { cart: true }
    //         });
    //       } else {
    //         console.log("Updating existing user...");
    //         await tx.user.update({
    //           where: { email: user.email },
    //           data: {
    //             name: user.name || existingUser.name,
    //             image: user.image || existingUser.image,
    //           }
    //         });
    //       }
    //     });

    //     return true;
    //   } catch (error) {
    //     console.error("Transaction error:", error);
    //     return false;
    //   }
    // },
    // async session({ session, token }) {
    //   console.log("Session Callback - Token:", token);

    //   if (!token.userId) {
    //     console.error(
    //       "Session Error: Token.userId is missing! Returning default session."
    //     );
    //     return session; // Avoid breaking the session
    //   }

    //   try {
    //     const user = await prisma.user.findUnique({
    //       where: { id: token.userId }, // Use token.userId instead of user.id
    //       include: {
    //         cart: { include: { items: true } },
    //         orders: {
    //           include: { items: true },
    //           orderBy: { createdAt: "desc" },
    //         },
    //       },
    //     });

    //     if (user) {
    //       session.user = {
    //         ...session.user,
    //         id: user.id,
    //         cart: user.cart,
    //         orders: user.orders,
    //       };
    //     } else {
    //       console.error("Session Error: No user found for ID:", token.userId);
    //     }
    //   } catch (error) {
    //     console.error("Error in session callback:", error);
    //   }

    //   return session;
    // },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.userId;
    
        const userData = await prisma.user.findUnique({
          where: { id: token.userId },
          include: {
            cart: {
              include: {
                cartItems: {
                  include: {
                    product: {  // Include product details in cart items
                      select: {
                        id: true,
                        name: true,
                        description: true,
                        images: true,
                        price: true
                      }
                    }
                  }
                }
              }
            },
            orders: true
          }
        });
        // console.log("User Data:", userData);
    
        if (!userData?.cart) {
          // console.log("Creating new cart for user...");
          const newCart = await prisma.cart.create({
            data: {
              userId: token.userId,
              updatedAt: new Date(),
              // id : token.userId,
            },
            include: {
              cartItems: true
            }
          });
          userData.cart = newCart;
        }
    
        session.user = {
          ...session.user,
          ...userData
        };
      }
      // console.log("Session:", session);
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log("Redirecting to:", url, "Base URL:", baseUrl);
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

/*smtng
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) {
        return false; // Require email
      }

      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
        include: {
          cart: {
            include: {
              items: true,
            },
          },
          orders: {
            include: {
              items: true,
            },
            orderBy: {
              createdAt: 'desc'
            },
          },
        },
      });

      if (!existingUser) {
        // Create new user with default values
        await prisma.user.update({
          where: { email: user.email },
          data: {
            cart: {
              create: {} // Create empty cart
            },
          },
        });
      }

      return true;
    },

    async session({ session, user }) {
      if (session?.user) {
        // Fetch full user data including cart and orders
        const fullUser = await prisma.user.findUnique({
          where: { id: user.id },
          include: {
            cart: {
              include: {
                items: true,
              },
            },
            orders: {
              include: {
                items: true,
              },
              orderBy: {
                createdAt: 'desc'
              },
              take: 5, // Get only last 5 orders for performance
            },
          },
        });

        // Enhance session with additional user data
        session.user = {
          ...session.user,
          id: user.id,
          cart: fullUser?.cart || null,
          orders: fullUser?.orders || [],
          phoneNumber: fullUser?.phoneNumber || null,
          address: fullUser?.address || null,
          city: fullUser?.city || null,
          state: fullUser?.state || null,
          zipCode: fullUser?.zipCode || null,
        };
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});

export { handler as GET, handler as POST };



in component
import { useSession } from "next-auth/react";

function YourComponent() {
  const { data: session } = useSession();
  
  if (session?.user) {
    // Access user data
    console.log(session.user.cart);        // Cart with items
    console.log(session.user.orders);      // Last 5 orders
    console.log(session.user.phoneNumber); // Contact details
    console.log(session.user.address);     // Address info
  }
}
*/

//new 7/2/25
// async signIn({ user, account, profile }) {
//   try {
//     // Check if user exists
//     const existingUser = await prisma.user.findUnique({
//       where: { email: user.email },
//       include: {
//         cart: {
//           include: {
//             items: true
//           }
//         },
//         orders: true
//       }
//     });

//     if (!existingUser) {
//       // Create new user with additional fields
//       const newUser = await prisma.user.create({
//         data: {
//           email: user.email,
//           name: user.name,
//           image: user.image,
//           // Create an empty cart for new user
//           cart: {
//             create: {}
//           }
//         },
//         include: {
//           cart: true
//         }
//       });
//       return true; // Allow sign in
//     }

//     return true; // Allow sign in for existing users
//   } catch (error) {
//     console.error("Error in signIn callback:", error);
//     return false; // Block sign in on error
//   }
// },

// async session({ session, user }) {
//   try {
//     // Fetch user with related data
//     const enrichedUser = await prisma.user.findUnique({
//       where: { id: user.id },
//       include: {
//         cart: {
//           include: {
//             items: true
//           }
//         },
//         orders: {
//           orderBy: {
//             createdAt: 'desc'
//           },
//           include: {
//             items: true
//           }
//         }
//       }
//     });

//     if (enrichedUser) {
//       session.user = {
//         ...session.user,
//         id: enrichedUser.id,
//         cart: enrichedUser.cart,
//         orders: enrichedUser.orders,
//         // Add any other custom fields you want to expose
//         phoneNumber: enrichedUser.phoneNumber,
//         address: enrichedUser.address,
//         zipCode: enrichedUser.zipCode
//       };
//     }

//     return session;
//   } catch (error) {
//     console.error("Error in session callback:", error);
//     return session;
//   }
// },

// async redirect({ url, baseUrl }) {
//   // If url starts with baseUrl, return as is
//   if (url.startsWith(baseUrl)) return url;

//   // If url is just a path, prepend baseUrl
//   if (url.startsWith('/')) return `${baseUrl}${url}`;

//   // Default to home page
//   return baseUrl;
// }
// },
// pages: {
// signIn: "/auth/signin",
// },

/** old   6/2/25
 adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // console.log("redirect", url, baseUrl);
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    session: async ({ session, user }) => {
      console.log("session", session, user);
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin", // Redirect to custom sign-in page
  },
 */
