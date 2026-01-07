import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

let locations = [];

// health check
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// receive location
app.post("/share-location", (req, res) => {
  const { lat, lon, label, device } = req.body;

  if (!lat || !lon) {
    return res.status(400).json({ error: "Missing location" });
  }

  locations.push({
    label: label || "Guest",
    device: device || "Unknown",
    lat: lat,
    lon: lon,
    time: new Date().toLocaleString(),
  });

  res.json({ ok: true });
});

// send history
app.get("/get-locations", (req, res) => {
  res.json(locations);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("✅ Backend running on port", PORT);
});
