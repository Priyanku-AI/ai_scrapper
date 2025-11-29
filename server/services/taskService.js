import { db } from "../db/client.js";
import { tasks } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { taskQueue } from "../queue/instance.js";
import { scrapeWebsite } from "../utils/scrape.js";
import { askAI } from "../utils/api.js";

// Add task to DB and add procesTask job to queue 
export async function addTask(url, question) {
    const [task] = await db.insert(tasks).values({ url, question }).returning();

    // Add job to queue
    await taskQueue.add("processTask", {
        taskId: task.id,
        url,
        question,
    });

    return task;
}

// Fetch task by ID
export async function fetchTaskById(id) {
    console.log("the id in service is", id);
    const [task] = await db.select().from(tasks).where(eq(tasks.id, Number(id)));
    return task;
}

//  Worker function: process the job
export async function processTaskJob({ taskId, url, question }) {
    try {
        console.log(`Processing task ${taskId}: ${url}`);

        // Update task status to "processing"
        await db.update(tasks).set({ status: "processing" }).where(eq(tasks.id, Number(taskId)));

        // Scrape website
        const scrapedContent = await scrapeWebsite(url);

        // Call AI API
        const answer = await askAI(question, scrapedContent);

        // Update DB with answer + status completed
        await db.update(tasks)
            .set({ status: "completed", answer })
            .where(eq(tasks.id, Number(taskId)));

        console.log(`Task ${taskId} completed successfully.`);
    } catch (err) {
        console.error(`Task ${taskId} failed:`, err);

        // Update DB status to "failed"
        await db.update(tasks)
            .set({ status: "failed", answer: null })
            .where(eq(tasks.id, Number(taskId)));

    }
}