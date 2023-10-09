const express = require("express");
const bodyParser = require("body-parser");
const { verifyIsLoggedIn } = require("./middleware/auth");
const Record = require("./model/record");
const jwt = require("jsonwebtoken");

const app = express();
app.use(bodyParser.json());

function calculateSummaryStats(data) {
  if (!data.length) {
    return null;
  }
  const mean = data.reduce((acc, val) => acc + val, 0) / data.length;
  const min = Math.min(...data);
  const max = Math.max(...data);
  return { mean, min, max };
}

app.get("/", (req, res) => {
  res.send("Server is running.....");
});

const JWT_SECRET_KEY = "secretdfghjk";

const generateAuthToken = (email) => {
  return jwt.sign({ email }, JWT_SECRET_KEY, { expiresIn: "7h" });
};

// app.post("/login", async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     if (!(email && password)) {
//       return res.status(400).send("All inputs are required");
//     }

//     //   const user = await User.findOne({ email }).orFail();

//     if (email == "admin" && password == "admin") {
//       let cookieParams = {
//         httpOnly: true,
//         //   secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//       };

//       return res
//         .cookie("access_token", generateAuthToken("admin"), cookieParams)
//         .json({
//           success: "user logged in",
//           userLoggedIn: {
//             email: "admin",
//           },
//         });
//     } else {
//       return res.status(401).send("wrong credentials");
//     }
//   } catch (err) {
//     next(err);
//   }
// });

// app.use(verifyIsLoggedIn);

app.post("/add_record", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const record = new Record(data);
    await record.save();
    res.json({ message: "Record added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add record" });
  }
});

// API to delete a record from the database by ID
app.delete("/delete_record/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Record.findByIdAndRemove(id);
    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: "Record not found" });
  }
});

// API to fetch summary statistics for salary over the entire dataset
app.get("/summary_stats", async (req, res) => {
  try {
    const records = await Record.find({});
    const salaries = records.map((record) => record.salary);
    const summaryStats = calculateSummaryStats(salaries);
    res.json(summaryStats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch summary stats" });
  }
});

// API to fetch summary statistics for salary for records with "on_contract" set to true
app.get("/summary_stats/on_contract", async (req, res) => {
  try {
    const records = await Record.find({ on_contract: true });
    const salaries = records.map((record) => record.salary);
    const summaryStats = calculateSummaryStats(salaries);
    res.json(summaryStats);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch summary stats for on_contract" });
  }
});

// API to fetch summary statistics for salary for each department
app.get("/summary_stats/by_department", async (req, res) => {
  try {
    const records = await Record.find({});
    const departmentStats = {};

    records.forEach((record) => {
      const department = record.department;
      if (!departmentStats[department]) {
        departmentStats[department] = [];
      }
      departmentStats[department].push(record.salary);
    });

    const result = {};
    for (const department in departmentStats) {
      result[department] = calculateSummaryStats(departmentStats[department]);
    }

    res.json(result);
  } catch (error) {
    console.error(error); // Log the error to the console for debugging
    res
      .status(500)
      .json({ error: "Failed to fetch summary stats by department" });
  }
});

// API to fetch summary statistics for salary for each department and sub-department combination
app.get("/summary_stats/by_department_subdepartment", async (req, res) => {
  try {
    const records = await Record.find({});
    const departmentSubdepartmentStats = {};

    records.forEach((record) => {
      const { department, sub_department } = record;
      const key = `${department}_${sub_department}`;
      if (!departmentSubdepartmentStats[key]) {
        departmentSubdepartmentStats[key] = [];
      }
      departmentSubdepartmentStats[key].push(record.salary);
    });

    const result = {};
    for (const key in departmentSubdepartmentStats) {
      result[key] = calculateSummaryStats(departmentSubdepartmentStats[key]);
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch summary stats by department and sub_department",
    });
  }
});

app.get("/get-all-records", async (req, res) => {
  try {
    const records = await Record.find({});
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch records" });
  }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
