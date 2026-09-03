import { createDemoSignInToken } from "../services/authService.js";

export async function createDemoToken(req, res, next) {
    try {
        const token = await createDemoSignInToken()

        res.json({ token })
    } catch(err) {
        next(err)
    }
}