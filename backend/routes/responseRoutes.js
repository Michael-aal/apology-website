import express from "express";
import {
  createResponse,
  getResponses
} from "../controllers/responseController.js";

const router = express.Router();

router.post("/", createResponse);

router.get("/", getResponses);

export default router;