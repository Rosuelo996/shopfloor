import express from "express";
import cors from "cors";
import errorHandler from "./middleware/error.js"
import notFound from "./middleware/notFound.js"
import dashboardRouter from "./routes/dashboard.js";
import handoverRouter from "./routes/handover.js";
import tasksRouter from './routes/tasks.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use("/dashboard", dashboardRouter);
app.use("/handovers", handoverRouter);
app.use("/tasks", tasksRouter)

app.use(notFound)
app.use(errorHandler)

export default app