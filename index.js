import express from "express";
import { validateRequest } from "./src/validator/validator.js";
import { createUserSchema } from "./constant.js";

const app = express();
app.use(express.json());

app.post("/data", validateRequest(createUserSchema), (req, res) => {
  res.send("no errors");
});

app.listen(8000, () => {
  console.log("server listning!!");
});
