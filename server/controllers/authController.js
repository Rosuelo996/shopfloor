import { getAuth } from "@clerk/express";
import { createDemoSignInToken } from "../services/authService.js";
import { fetchDemoUserById } from "../services/usersService.js";

export async function createDemoToken(req, res, next) {
  try {
    const clerkUserId = process.env.DEMO_CLERK_USER_ID;
    const token = await createDemoSignInToken(clerkUserId);

    res.json({ token });
  } catch (err) {
    next(err);
  }
}

export async function switchDemoUser(req, res, next) {
  try {
    const auth = getAuth(req);
    const clerkUserId = auth.userId;

    if (!clerkUserId) {
      return res.status(401).json({
        message: "Unauthenticated",
      });
    }

    const { userId } = req.body;

    if (!userId || !Number.isInteger(userId)) {
      return res.status(400).json({
        message: "Valid user ID is required",
      });
    }

    const user = await fetchDemoUserById(userId);

    if (!user) {
      return res.status(404).json({
        message: "Demo user not found",
      });
    }

    const token = await createDemoSignInToken(user.clerkUserId)
    res.json({ token })
  } catch (err) {
    next(err);
  }
}
