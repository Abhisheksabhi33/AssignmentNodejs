const express = require("express");
const router = express.Router();
const loginUser = require("../controller/login");
const {
  add_record,
  delete_record,
  summary_stats,
  summary_stats_on_contract,
  summary_stats_by_department,
  summary_stats_by_department_subdepartment,
  get_all_records,
} = require("../controller/record");

const { verifyIsLoggedIn } = require("../middleware/auth");
const cookieParser = require("cookie-parser");

router.use(cookieParser());
router.post("/login", loginUser);
router.use(verifyIsLoggedIn);

router.post("/add_record", add_record);
router.get("/summary_stats", summary_stats);
router.get("/summary_stats/on_contract", summary_stats_on_contract);
router.get("/summary_stats/by_department", summary_stats_by_department);
router.get(
  "/summary_stats/by_department_subdepartment",
  summary_stats_by_department_subdepartment
);
router.get("/get-all-records", get_all_records);
router.delete("/delete_record/:id", delete_record);

module.exports = router;
