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

router.delete("/:id", async (req, res) => {
  //console.log(req.params);
  try {
    const id: number = parseInt(req.params.id);
    const level3 = await prisma.level3.delete({
      where: {
        id:id,
      },
    });
    res.json(level3);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/edit/", async (req, res) => {
  try {
    let data = req.body;
    let idList = data.id.split('-')
    console.log(data)
    const level3 = await prisma.level3.update({
      where: {
        id:parseInt(idList[idList.length-1]),
      },
      data:{
        code:data.code,
        name:data.name
      },
    });
    res.json(level3);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
