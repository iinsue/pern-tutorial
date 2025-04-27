import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// allow us to parse the incoming data
app.use(express.json());

app.use(cors());

// helmet is a security middleware that helps you protect your app by setting various HTTP headers
app.use(helmet());

// morgan is log the requests to the console
app.use(morgan("dev"));

app.get("/test", (req, res) => {
  res.send("Hello from the backend!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
