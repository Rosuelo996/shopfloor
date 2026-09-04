import { getAuth } from "@clerk/express";
import {
  fetchDemoUsers,
  fetchUserByClerkId,
  createUser,
} from "../services/usersService.js";
import { createClerkUser } from "../services/authService.js";

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


export async function createNewUser(req, res, next) {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (
      !firstName?.trim() ||
      !lastName?.trim() ||
      !email?.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "First name, last name, email and password are required",
      });
    }

    const clerkUserId = await createClerkUser(
      firstName.trim(),
      lastName.trim(),
      email.trim().toLowerCase(),
      password
    );

    const user = await createUser(
      firstName.trim(),
      lastName.trim(),
      clerkUserId
    );

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

