const express = require("express");
const bodyParser = require("body-parser");
const recordRouter = require("./routes/record");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Server is running.....");
});

app.use("/api", recordRouter);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
