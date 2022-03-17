import express from "express";
import { Device } from "../types/device";
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const devices = await prisma.device.findMany({
      include: { level3: true },
    });
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
      include: {
        History: {
          take: 10,
          orderBy: {
            createdAt: "desc",
          },
        },
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

router.delete("/:id", async (req, res) => {
  //console.log(req.params);
  try {
    const id: number = parseInt(req.params.id);
    const device = await prisma.device.delete({
      where: {
        id:id,
      },
    });
    res.json(device);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/edit/", async (req, res) => {
  try {
    let data = req.body;
    let idList = data.id.split('-')
    //console.log(data)
    const device = await prisma.device.update({
      where: {
        id:parseInt(idList[idList.length-1]),
      },
      data:{
        binId:data.binId,
      },
    });
    res.json(device);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


export default router;
