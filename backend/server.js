import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import { sql } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// allow us to parse the incoming data
app.use(express.json());

app.use(cors());

// helmet is a security middleware that helps you protect your app by setting various HTTP headers
app.use(helmet());

// morgan is log the requests to the console
app.use(morgan("dev"));

app.use("/api/products", productRoutes);

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
