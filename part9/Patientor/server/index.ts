import express from "express";
import router from "./routes";

const app = express();
app.use("/api", router);

app.listen(3000, () => {
  console.log(`listening to http://localhost:3000/`);
});
