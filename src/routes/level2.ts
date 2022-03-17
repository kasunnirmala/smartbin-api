import express from "express";
import { Level2 } from "../types/level2";
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
  const level2s = await prisma.level2.findMany();
  res.json(level2s);
} catch (err) {
  res.status(500).send(err.message);
}
});

router.get("/:id", async (req, res) => {
  try {
  const id: number = parseInt(req.params.id);
  const level2 = await prisma.level2.findUnique({
    where: {
      id,
    },
  });
  res.json(level2);
} catch (err) {
  res.status(500).send(err.message);
}
});

router.post("/", async (req, res) => {
  try {
  let data: Level2 = req.body;
  const level2 = await prisma.level2.create({
    data,
  });
  res.json(level2);
} catch (err) {
  res.status(500).send(err.message);
}
});

router.delete("/:id", async (req, res) => {
  //console.log(req.params);
  try {
    const id: number = parseInt(req.params.id);
    const level2 = await prisma.level2.delete({
      where: {
        id:id,
      },
    });
    res.json(level2);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/edit/", async (req, res) => {
  try {
    let data = req.body;
    let idList = data.id.split('-')
    console.log(data)
    const level2 = await prisma.level2.update({
      where: {
        id:parseInt(idList[idList.length-1]),
      },
      data:{
        code:data.code,
        name:data.name
      },
    });
    res.json(level2);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
export default router;
