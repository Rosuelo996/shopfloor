import app from "./app.js";
import dotenv from "dotenv";
import db from "./db/db.js";

dotenv.config()

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`shopfloor API is running on http://localhost:${PORT} `)
})
