import express from "express";
import { Device } from "../types/device";
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const devices = await prisma.device.findMany();
    res.json(devices);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
  const id: number = parseInt(req.params.id);
  const device = await prisma.device.findUnique({
    where: {
      id,
    },
  });
  res.json(device);
} catch (err) {
  res.status(500).send(err.message);
}
});

router.post("/", async (req, res) => {
  try {
  let data: Device = req.body;
  const device = await prisma.device.create({
    data,
  });
  res.json(device);
} catch (err) {
  res.status(500).send(err.message);
}
});

export default router;
