import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Load .env from the parent directory
dotenv.config({ path: path.join(__dirname, "..", ".env") });

// Print the variable
console.log("POSTGRES_DB:", process.env.POSTGRES_DB);

// Optional: check if it exists
if (!process.env.POSTGRES_DB) {
  console.log("POSTGRES_DB is not loaded!");
} else {
  console.log("POSTGRES_DB loaded successfully!");
}
