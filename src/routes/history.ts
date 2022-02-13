import express from "express";
import { Device } from "../types/device";
import { History } from "../types/history";
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const histories = await prisma.history.findMany();
  res.json(histories);
});

router.get("/:id", async (req, res) => {
  const id: number = parseInt(req.params.id);
  const history = await prisma.history.findUnique({
    where: {
      id,
    },
  });
  res.json(history);
});

router.post("/", async (req, res) => {
  let data: History = req.body;
  const device: Device = await prisma.device.findUnique({
    where: {
      binId: data.binId,
    },
  });
  data.deviceId = device.id;
  device.lastUpdatedValue = data.value;
  const [hisory, updatedDevice] = await prisma.$transaction([
    prisma.history.create({ data }),
    prisma.device.update({
      where: { id: device.id },
      data,
    }),
  ]);

  res.json([hisory, updatedDevice]);
});

export default router;
