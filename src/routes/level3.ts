import express from "express";
import { Level3 } from "../types/level3";
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
  const level3s = await prisma.level3.findMany();
  res.json(level3s);
} catch (err) {
  res.status(500).send(err.message);
}
});

router.get("/:id", async (req, res) => {
  try {
  const id: number = parseInt(req.params.id);
  const level3 = await prisma.level3.findUnique({
    where: {
      id,
    },
  });
  res.json(level3);
} catch (err) {
  res.status(500).send(err.message);
}
});

router.post("/", async (req, res) => {
  try {
  let data: Level3 = req.body;
  const level3 = await prisma.level3.create({
    data,
  });
  res.json(level3);
} catch (err) {
  res.status(500).send(err.message);
}
});

export default router;
