import express from "express";
import { Device } from "../types/device";
import { History } from "../types/history";
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const histories = await prisma.history.findMany();
    res.json(histories);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id: number = parseInt(req.params.id);
    const history = await prisma.history.findUnique({
      where: {
        id,
      },
    });
    res.json(history);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const binId = req.body.binId;
    let data: History = { value: req.body.value, data: req.body.data };
    // data.data = JSON.stringify(req.body);
    const device: Device = await prisma.device.findUnique({
      where: {
        binId: binId,
      },
    });
    data.deviceId = device.id;
    const [hisory, updatedDevice] = await prisma.$transaction([
      prisma.history.create({ data }),
      prisma.device.update({
        where: { id: device.id },
        data: { lastUpdatedValue: data.value },
      }),
    ]);

    res.json([hisory, updatedDevice]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
