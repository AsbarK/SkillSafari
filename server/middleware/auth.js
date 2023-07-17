const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.SECRET;

function checkTokenUser(req, res, next) {
  let authHeader = req.headers.authorization;
  if (authHeader) {
    // authHeader = authHeader.split(" ")[1];
    jwt.verify(authHeader, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(401);
      } else {
        if (user.role === "user") {
          req.user = user;
          next();
        } else {
          alert("This is User Route Not Admin");
        }
      }
    });
  }
}
function checkTokenAdmin(req, res, next) {
  let authHeader = req.headers.authorization;
  if (authHeader) {
    // authHeader = authHeader.split(" ")[1];
    jwt.verify(authHeader, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(401);
      } else {
        if (user.role === "admin") {
          req.user = user;
          next();
        } else {
          alert("This is User Route Not Admin");
        }
      }
    });
  }
}

module.exports = {
  checkTokenUser,
  checkTokenAdmin,
};
