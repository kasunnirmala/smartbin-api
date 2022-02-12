import express from "express";
import { Level1 } from "../types/level1";
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  //   let level1: Level1 = {
  //     code: "L1T1",
  //     name: "Level1 Test1",
  //   };
  const job = await prisma.level1.findMany();

  //   const [posts, totalPosts] = await prisma.$transaction([
  //     prisma.post.findMany({ where: { title: { contains: 'prisma' } } }),
  //     prisma.post.count(),
  //   ])

  res.json(job);
});

export default router;
