import express from "express";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

// helmet is a security middleware that helps you protect your app by setting various HTTP headers
app.use(helmet());

// morgan is log the requests to the console
app.use(morgan("dev"));

app.get("/test", (req, res) => {
  res.send("Hello from the backend!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
