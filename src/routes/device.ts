import express from "express";
import { Device } from "../types/device";
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const devices = await prisma.device.findMany();
  res.json(devices);
});

router.get("/:id", async (req, res) => {
  const id: number = parseInt(req.params.id);
  const device = await prisma.device.findUnique({
    where: {
      id,
    },
  });
  res.json(device);
});

router.post("/", async (req, res) => {
  let data: Device = req.body;
  const device = await prisma.device.create({
    data,
  });
  res.json(device);
});

export default router;
