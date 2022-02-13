import express from "express";
import { Level1 } from "../types/level1";
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const level1s = await prisma.level1.findMany();
  res.json(level1s);
});

router.get("/:id", async (req, res) => {
  const id: number = parseInt(req.params.id);
  const level1 = await prisma.level1.findUnique({
    where: {
      id,
    },
  });
  res.json(level1);
});

router.post("/", async (req, res) => {
  let data: Level1 = req.body;
  const level1 = await prisma.level1.create({
    data,
  });
  res.json(level1);
});

export default router;
