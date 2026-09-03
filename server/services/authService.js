import { createClerkClient } from "@clerk/express"

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});


export async function createDemoSignInToken() {
    const demoUserId = process.env.DEMO_CLERK_USER_ID;

    const sigInToken = await clerkClient.signInTokens.createSignInToken({
        userId: demoUserId,
        expiresInSeconds: 60,
    })

    return sigInToken.token
}