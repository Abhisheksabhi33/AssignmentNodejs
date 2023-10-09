const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const generateAuthToken = (email) => {
  return jwt.sign({ email }, JWT_SECRET_KEY, { expiresIn: "7h" });
};
const JWT_SECRET_KEY = "secretdfghjk";

const loginUser=async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      if (!(email && password)) {
        return res.status(400).send("All inputs are required");
      }
  
      //   const user = await User.findOne({ email }).orFail();
  
      if (email == "admin@gmail.com" && password == "admin") {
        let cookieParams = {
          httpOnly: true,
          //   secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        };
  
        return res
          .cookie("access_token", generateAuthToken("admin"), cookieParams)
          .json({
            success: "user logged in",
            userLoggedIn: {
              email: "admin",
            },
          });
      } else {
        return res.status(401).send("wrong credentials");
      }
    } catch (err) {
      next(err);
    }
  };

  module.exports = loginUser;