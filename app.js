const express = require("express");
const app = express();
const PORT = 3000;
const usersList = require("./userData");

app.use(express.json());

app.use("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Example App is listneing to port ${PORT}`);
});
