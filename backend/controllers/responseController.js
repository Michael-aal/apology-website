import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createResponse = async (req, res) => {
  try {
    const { name, answer } = req.body;

    if (!name || !answer) {
      return res.status(400).json({
        success: false,
        message: "Name and answer are required"
      });
    }

    if (!["forgive", "not_forgive"].includes(answer)) {
      return res.status(400).json({
        success: false,
        message: "Invalid answer"
      });
    }

    const response = await prisma.response.create({
      data: {
        name,
        answer
      }
    });

    res.status(201).json({
      success: true,
      response
    });

  } catch (error) {
    console.error("Create response error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to save response"
    });
  }
};

export const getResponses = async (req, res) => {
  try {
    const responses = await prisma.response.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    res.json({
      success: true,
      responses
    });

  } catch (error) {
    console.error("Get responses error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch responses"
    });
  }
};