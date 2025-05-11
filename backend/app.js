const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const sequelize = require("./config/db");
const db = require("./models");
require("./seed-captures-final");

app.use(express.json());

const captureRoutes = require("./routes/captures");
app.use("/api/captures", captureRoutes);

// Sync DB
db.sequelize
  .sync({ force: false }) // force: true maakt alles opnieuw aan!
  .then(() => console.log("✅ Tabellen gesynchroniseerd"))
  .catch((err) => console.error("❌ Sync fout:", err));

// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server draait op poort ${PORT}`));
