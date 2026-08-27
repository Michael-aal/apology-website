import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import responseRoutes from "./routes/responseRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Apology API is running"
  });
});

app.use("/api/responses", responseRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});