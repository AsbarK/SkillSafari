const express = require("express");
const jwt = require("jsonwebtoken");
const { ADMINS, COURSES } = require("../module/mongoVariable");
const { checkTokenAdmin } = require("../middleware/auth");

const router = express.Router();
require("dotenv").config();
const SECRET = process.env.SECRET;
function generateJwt(user) {
  if (user) {
    return jwt.sign(user, SECRET);
  }
}

// Admin routes
router.post("/signup", async (req, res) => {
  // logic to sign up admin
  let userName = req.body.username;
  let password = req.body.password;
  let existingAdmin = await ADMINS.findOne({ username: userName });
  if (existingAdmin) {
    return res.sendStatus(403);
  } else {
    const admin = {
      username: userName,
      password: password,
    };
    const newAdmin = new ADMINS(admin);
    await newAdmin.save();
  }
  return res.status(200).json({ message: "Admin created successfully" });
});

router.post("/login", async (req, res) => {
  let userName = req.body.username;
  let password = req.body.password;
  let existingAdmin = await ADMINS.findOne({ username: userName });
  if (existingAdmin && Number(existingAdmin.password) === Number(password)) {
    const token = generateJwt({
      username: userName,
      role: "admin",
    });
    res.status(200).json({ message: "Logged in successfully", token: token });
  } else {
    res.sendStatus(400);
  }
  // logic to log in admin
});

router.post("/courses", checkTokenAdmin, async (req, res) => {
  // logic to create a course
  let course = COURSES(req.body);
  await course.save();
  return res
    .status(200)
    .json({ message: "Course created successfully", courseId: course.id });
});

router.put("/courses/:courseId", checkTokenAdmin, async (req, res) => {
  // logic to edit a course
  let courseId = req.params.courseId;
  let course = await COURSES.findByIdAndUpdate(courseId, req.body, {
    new: true,
  });
  if (course) {
    return res.json({ message: "Course updated successfully" });
  } else {
    return res.json({ message: "Course not Found" });
  }
});

router.get("/courses", checkTokenAdmin, async (req, res) => {
  // logic to get all courses
  const course = await COURSES.find({});
  return res.json({ courses: course });
});

module.exports = router;
