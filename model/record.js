const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://pw:pw123@cluster0.fird7k4.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const recordSchema = new mongoose.Schema({
  name: String,
  salary: Number,
  currency: String,
  department: String,
  sub_department: String,
  on_contract: Boolean,
});

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;
