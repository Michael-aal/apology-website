import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createResponse = async (req, res) => {
  try {
    const { answer } = req.body;

    if (!answer) {
      return res.status(400).json({
        success: false,
        message: "Answer is required"
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
        answer
      }
    });

    res.status(201).json({
      success: true,
      response
    });
  } catch (error) {
    console.error(error);

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
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch responses"
    });
  }
};