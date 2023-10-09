const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const Record = require("../model/record");

function calculateSummaryStats(data) {
    if (!data.length) {
      return null;
    }
    const mean = data.reduce((acc, val) => acc + val, 0) / data.length;
    const min = Math.min(...data);
    const max = Math.max(...data);
    return { mean, min, max };
  }

const add_record = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        const record = new Record(data);
        await record.save();
        res.json({ message: "Record added successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to add record" });
    }
};

const delete_record = async (req, res) => {
    try {
        const { id } = req.params;
        await Record.findByIdAndRemove(id);
        res.json({ message: "Record deleted successfully" });
    } catch (error) {
        res.status(404).json({ error: "Record not found" });
    }
}
const summary_stats = async (req, res) => {
    try {
        const records = await Record.find({});
        const salaries = records.map((record) => record.salary);
        const summaryStats = calculateSummaryStats(salaries);
        res.json(summaryStats);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch summary stats" });
    }
}

const summary_stats_on_contract = async (req, res) => {
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
}
const summary_stats_by_department = async (req, res) => {
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
}
const summary_stats_by_department_subdepartment = async (req, res) => {
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
}

const get_all_records = async (req, res) => {
    try {
        const records = await Record.find({});
        res.json(records);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch records" });
    }
}

module.exports = { add_record, delete_record, summary_stats, summary_stats_on_contract, summary_stats_by_department, summary_stats_by_department_subdepartment, get_all_records };