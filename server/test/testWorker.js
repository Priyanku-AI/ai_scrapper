import "../config/env.js";
import { taskQueue } from "../queue/instance.js";
import "../queue/worker.js";

console.log("Adding test job...");

async function run() {
  const job = await taskQueue.add("testTask", {
    message: "Hello from test!"
  });

  console.log("Job added:", job.id);
}

run();
