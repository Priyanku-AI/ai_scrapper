import dotenv from "dotenv";
import app from "./app.js"
import path from "path";
import { fileURLToPath } from "url";

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from the parent directory
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const PORT = process.env.PORT || 5000;
console.log("port is", PORT);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in http://localhost:${PORT}`);
});

