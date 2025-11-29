import { taskQueue } from "../queue/instance.js";

(async () => {
  await taskQueue.add("testJob", { message: "Hello Queue" });
  console.log("Job added!");
})();