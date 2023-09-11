import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { scraper } from "./src/scraper";
import { transformData } from "./src/transformData";

import path from "path";
import { generateHtml } from "./src/generateHtml";

const zweiteBLsüd = "zweite-bl-süd";

const app = express();
const PORT = process.env.PORT || 8888;

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json({ limit: "50mb" }));

app.get("/", async (req, res) => {
  try {
    const json = await scraper(zweiteBLsüd);
    const games = transformData(json);
    const htmlString = generateHtml(games);
    res.setHeader(
      "Content-Security-Policy",
      "frame-ancestors https://www.stusta-rugby.de http://127.0.0.1:5501"
    );
    res.status(200).send(htmlString);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
});
