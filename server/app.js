import express from "express";
import taskRoutes from "./routes/taskRoutes.js";
import cors from "cors";
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(cors());

app.use(morgan('dev')); // Logs HTTP requests in development

// test route
app.use('/api/test', (req, res) => {
  res.json({ message: 'Test route' });
});

// API routes
app.use("/api/task", taskRoutes);

export default app;