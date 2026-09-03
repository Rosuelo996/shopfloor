import { getAuth } from "@clerk/express";
import {
  fetchDemoUsers,
  fetchUserByClerkId,
} from "../services/usersService.js";

export async function getDemoUsers(req, res, next) {
  try {
    const users = await fetchDemoUsers();

    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function getCurrentUser(req, res, next) {
  try {
    const auth = getAuth(req);
    const clerkUserId = auth.userId;

    if (!clerkUserId) {
      return res.status(401).json({
        message: "Unauthenticated",
      });
    }

    const user = await fetchUserByClerkId(clerkUserId);

    if(!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
}
