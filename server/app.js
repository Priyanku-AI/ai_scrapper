import express from "express";
import taskRoutes from "./routes/taskRoutes.js";


const app = express();
app.use(express.json());

// API routes
app.use("/api/task", taskRoutes);

export default app;