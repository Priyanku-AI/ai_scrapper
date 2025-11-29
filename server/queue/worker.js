import { Worker } from "bullmq";
import { connection } from "./instance.js";
import { processTaskJob } from "../services/taskService.js";

// Worker listens to "tasks" queue
const worker = new Worker(
    "tasks",
    async (job) => {
        console.log("Worker received job:", job.data);
        await processTaskJob(job.data);
    },
    {
        connection,
        concurrency: 5,  // optional
    }
);

// Log events
worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
    console.error(`Job ${job?.id} failed:`, err);
});
