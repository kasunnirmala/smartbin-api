import express from "express";
import { Level3 } from "../types/level3";
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const level3s = await prisma.level3.findMany();
  res.json(level3s);
});

router.get("/:id", async (req, res) => {
  const id: number = parseInt(req.params.id);
  const level3 = await prisma.level3.findUnique({
    where: {
      id,
    },
  });
  res.json(level3);
});

router.post("/", async (req, res) => {
  let data: Level3 = req.body;
  const level3 = await prisma.level3.create({
    data,
  });
  res.json(level3);
});

export default router;
