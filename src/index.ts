import express from "express";
const app = express();
const port = process.env.PORT || "3000";
import level1Router from "./routes/level1";
import level2Router from "./routes/level2";
import level3Router from "./routes/level3";
import deviceRouter from "./routes/device";
import historyRouter from "./routes/history";

app.use(express.json());
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
app.use("/level1", level1Router);
app.use("/level2", level2Router);
app.use("/level3", level3Router);
app.use("/device", deviceRouter);
app.use("/history", historyRouter);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
