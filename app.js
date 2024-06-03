const express = require("express");
const cors = require("cors");
const bukuRouter = require("./buku");
const port = "3100";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/buku", bukuRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Buku Service! 😁");
});

app.listen(port, () => {
  console.log("Server Connected on PORT: " + port + "/");
});
