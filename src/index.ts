import { json } from "body-parser";
import express from "express";
import authRoutes from "./routes/authRoutes";

const app = express();
app.use(json());

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
