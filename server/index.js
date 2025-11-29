import "./config/env.js";

import app from "./app.js"

const PORT = process.env.PORT || 5000;
console.log("port is", PORT);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in http://localhost:${PORT}`);
});

