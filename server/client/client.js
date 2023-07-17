const express = require("express");
const jwt = require("jsonwebtoken");
const { USERS, COURSES } = require("../module/mongoVariable");
const { checkTokenUser } = require("../middleware/auth");
const router = express.Router();
require("dotenv").config();
const SECRET = process.env.SECRET;
function generateJwt(user) {
  if (user) {
    return jwt.sign(user, SECRET);
  }
}

router.post("/signup", async (req, res) => {
  // logic to sign up user
  let userName = req.body.username;
  let password = req.body.password;
  let existingUser = await USERS.findOne({ username: userName });
  if (existingUser) {
    return res.sendStatus(409);
  } else {
    let user = {
      username: userName,
      password: password,
      purchasedCourses: [],
    };
    const newUser = new USERS(user);
    await newUser.save();
    return res.json({ message: "User created successfully" });
  }
});

router.post("/login", async (req, res) => {
  // logic to log in user

  let userName = req.body.username;
  let password = req.body.password;
  let existingUser = await USERS.findOne({ username: userName });
  if (existingUser && existingUser.password === password) {
    const token = generateJwt({
      username: userName,
      role: "user",
    });
    res.status(200).json({ message: "Logged in successfully", token });
  } else {
    res.sendStatus(400);
  }
});

router.get("/courses", checkTokenUser, async (req, res) => {
  // logic to list all courses
  let filteredCourses = await COURSES.find({ published: true });
  res.json({
    courses: filteredCourses,
  });
});
router.get("/courses/:courseId", checkTokenUser, async (req, res) => {
  // logic to list courses
  let courseId = req.params.courseId;

  let coursePurchased = await COURSES.findById(courseId);
  if (coursePurchased) {
    return res.json({ course: coursePurchased });
  } else {
    return res
      .status(404)
      .json({ message: "Course not found or not available" });
  }
});

router.post("/courses/:courseId", checkTokenUser, async (req, res) => {
  // logic to purchase a course
  let courseId = req.params.courseId;

  let coursePurchased = await COURSES.findById(courseId);
  if (coursePurchased) {
    // Object.assign(user,{purchasedCourses:user.purchasedCourses.push(coursePurchased)})
    let user = await USERS.findOne({ username: req.user.username });
    user.purchasedCourses.push(coursePurchased);
    await user.save();
    return res.json({ message: "Course purchased successfully" });
  } else {
    return res
      .status(404)
      .json({ message: "Course not found or not available" });
  }
});

router.get("/purchasedCourses", checkTokenUser, async (req, res) => {
  // logic to view purchased courses
  let user = await USERS.findOne({ username: req.user.username }).populate(
    "purchasedCourses"
  );
  let purchasedCourses = user.purchasedCourses || [];

  return res.json({ purchasedCourses });
});
module.exports = router;
