// server.js
import express from "express";
import puppeteer from "puppeteer";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/accesibilidad", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "Falta URL" });

  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    const snapshot = await page.accessibility.snapshot();
    await browser.close();

    res.json(snapshot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Servidor accesibilidad en http://localhost:" + PORT);
});
