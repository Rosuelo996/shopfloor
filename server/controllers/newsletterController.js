import { fetchNewsletter } from "../services/newsletterService.js"

export async function getNewsletter(req, res, next) {
    try{
        const date = req.query.date || "2026-08-31"
        const newsletter = await fetchNewsletter(date)

        res.json(newsletter)
    } catch(err) {
        next(err)
    }
}