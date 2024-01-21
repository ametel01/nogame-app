// backend/src/server.ts
import app from "./app";

const PORT = process.env.PORT ? +process.env.PORT : 3001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
