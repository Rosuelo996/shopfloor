import { fetchNotifications } from "../services/notificationService.js";

export async function getNotifications(req, res, next) {
    try {
     const notifications = await fetchNotifications()
     res.json(notifications)
    } catch (err) {
        next(err)
    }
}