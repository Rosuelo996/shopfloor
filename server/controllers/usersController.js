import { fetchUsers } from "../services/usersService.js";

export async function getUsers(req, res, next) {
    try {
        const users = await fetchUsers()

       res.json(users)
    } catch(err) {
        next(err)
    }
}