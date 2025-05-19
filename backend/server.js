import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import { sql } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { aj } from "./lib/arcjet.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// allow us to parse the incoming data
app.use(express.json());

app.use(cors());

// helmet is a security middleware that helps you protect your app by setting various HTTP headers
app.use(helmet({ contentSecurityPolicy: false }));

// morgan is log the requests to the console
app.use(morgan("dev"));

// apply arcjet rate-limit to all routes
app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1, // specifies that each request consumes 1 token
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({ error: "Too Many Requests" });
      } else if (decision.reason.isBot()) {
        res.status(403).json({ error: "Bot access denied" });
      } else {
        res.status(403).json({ error: "Forbidden" });
      }
      return;
    }

    // check for spoofed bots
    if (
      decision.results.some(
        (result) => result.reason.isBot() && result.reason.isSpoofed()
      )
    ) {
      res.status(403).json({ error: "Spoofed bot detected" });
      return;
    }

    next();
  } catch (error) {
    console.log("Arcjet Error", error);
    next(error);
  }
});

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  // server our react app
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("/*splat", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

async function initDB() {
  try {
    // products table 생성
    await sql`
      CREATE TABLE IF NOT EXISTS products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log("✅ Database initialized successfully🔥");
  } catch (error) {
    console.error("⚠️Error initDB", error);
  }
}

// DB연결 후에 서버 구동
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
  });
});
