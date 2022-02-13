import express from "express";
import { Level1 } from "../types/level1";
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
  const level1s = await prisma.level1.findMany();
  res.json(level1s);
} catch (err) {
  res.status(500).send(err.message);
}
});

router.get("/:id", async (req, res) => {
  try {
  const id: number = parseInt(req.params.id);
  const level1 = await prisma.level1.findUnique({
    where: {
      id,
    },
  });
  res.json(level1);
} catch (err) {
  res.status(500).send(err.message);
}
});

router.post("/", async (req, res) => {
  try {
  let data: Level1 = req.body;
  const level1 = await prisma.level1.create({
    data,
  });
  res.json(level1);
} catch (err) {
  res.status(500).send(err.message);
}
});

export default router;
