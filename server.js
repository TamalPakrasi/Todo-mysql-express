import express from "express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "views", "pages", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
