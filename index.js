const express = require("express");
const bodyParser = require("body-parser");
const { verifyIsLoggedIn } = require("./middleware/auth");
const cookieParser = require("cookie-parser");
const Record = require("./model/record");
const jwt = require("jsonwebtoken");
const loginUser = require("./controller/login");
const { add_record, delete_record, summary_stats, summary_stats_on_contract, summary_stats_by_department, summary_stats_by_department_subdepartment, get_all_records } = require("./controller/record");

const app = express();
app.use(bodyParser.json());



app.get("/", (req, res) => {
  res.send("Server is running.....");
});

const JWT_SECRET_KEY = "secretdfghjk";


app.post("/login", loginUser);

app.use(cookieParser());
app.use(verifyIsLoggedIn);

app.post("/add_record", add_record);

// API to delete a record from the database by ID
app.delete("/delete_record/:id", delete_record);

// API to fetch summary statistics for salary over the entire dataset
app.get("/summary_stats", summary_stats);

// API to fetch summary statistics for salary for records with "on_contract" set to true
app.get("/summary_stats/on_contract", summary_stats_on_contract);

// API to fetch summary statistics for salary for each department
app.get("/summary_stats/by_department", summary_stats_by_department);

// API to fetch summary statistics for salary for each department and sub-department combination
app.get("/summary_stats/by_department_subdepartment", summary_stats_by_department_subdepartment);

app.get("/get-all-records", get_all_records);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
