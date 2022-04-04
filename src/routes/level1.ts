import express from "express";
import { Level1 } from "../types/level1";
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
  const level1s = await prisma.level1.findMany({
    where: {
      status:true,
    },
  });
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
      status:true,
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

router.delete("/:id", async (req, res) => {
  //console.log(req.params);
  try {
    const id: number = parseInt(req.params.id);
    const level1 = await prisma.level1.update({
      where: {
        id:id,
      },
      data:{
        status: false,
      },
    });
    await prisma.level2.updateMany({
      where: {
        level1:{status:false,}
      },
      data:{
        status: false,
      },
    });
    await prisma.level3.updateMany({
      where: {
        level2:{status:false,}
      },
      data:{
        status: false,
      },
    });
    await prisma.device.updateMany({
      where: {
        level3:{status:false,}
      },
      data:{
        status: false,
      },
    });
    res.json(level1);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/edit/", async (req, res) => {
  try {
    let data = req.body;
    let idList = data.id.split('-')
    //console.log(data)
    const level1 = await prisma.level1.update({
      where: {
        id:parseInt(idList[idList.length-1]),
      },
      data:{
        code:data.code,
        name:data.name
      },
    });
    res.json(level1);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
