import { createClerkClient } from "@clerk/express"

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});


export async function createDemoSignInToken(clerkUserId) {

    const sigInToken = await clerkClient.signInTokens.createSignInToken({
        userId: clerkUserId,
        expiresInSeconds: 60,
    })

    return sigInToken.token
}