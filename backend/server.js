import express from "express";
import helmet from "helmet";

const app = express();

app.use(helmet());

app.get("/", (req, res) => {
  console.log(res.getHeaders());
  res.send("Hello from the backend!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
