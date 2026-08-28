import express from "express";

import {
  createResponse,
  getResponses,
  deleteResponse
} from "../controllers/responseController.js";

const router = express.Router();

router.post("/", createResponse);

router.get("/", getResponses);

router.delete("/:id", deleteResponse);

export default router;

