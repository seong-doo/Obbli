import express from "express";
const morgan = require("morgan");

const app = express();
const port = 3000;
app.use(morgan("dev"));
import "reflect-metadata";
import { createConnection } from "typeorm";

// createConnection()
//   .then(async (connection) => {
//     console.log("Connect_DataBase");
//   })
//   .catch((error) => console.log(error));

app.get("/", (req, resp) => {
  console.log("Hello, world!");
  return resp.status(200).send("Hello, world!");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
