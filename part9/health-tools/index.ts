import express, { Response, Request } from "express";

const app = express();

app.get("/hello", (_: Request, res: Response) => {
  return res.send("Hello Full Stack!");
});

app.listen(3000, () => {
  console.log("listening at port 3000");
});
