const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
const SECRET = process.env.SECRET;

app.use(express.json());
app.use(cors());

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Courses" }],
});
const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

let ADMINS = mongoose.model("Admin", adminSchema);
let USERS = mongoose.model("User", userSchema);
let COURSES = mongoose.model("Courses", courseSchema);

mongoose.connect(process.env.mongoSecret, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function generateJwt(user) {
  if (user) {
    return jwt.sign(user, SECRET);
  }
}
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
// Admin routes
app.post("/admin/signup", async (req, res) => {
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

app.post("/admin/login", async (req, res) => {
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

app.post("/admin/courses", checkTokenAdmin, async (req, res) => {
  // logic to create a course
  let course = COURSES(req.body);
  await course.save();
  return res
    .status(200)
    .json({ message: "Course created successfully", courseId: course.id });
});

app.put("/admin/courses/:courseId", checkTokenAdmin, async (req, res) => {
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

app.get("/admin/courses", checkTokenAdmin, async (req, res) => {
  // logic to get all courses
  const course = await COURSES.find({});
  return res.json({ courses: course });
});

// User routes
app.post("/users/signup", async (req, res) => {
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

app.post("/users/login", async (req, res) => {
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

app.get("/users/courses", checkTokenUser, async (req, res) => {
  // logic to list all courses
  let filteredCourses = await COURSES.find({ published: true });
  res.json({
    courses: filteredCourses,
  });
});
app.get("/users/courses/:courseId", checkTokenUser, async (req, res) => {
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

app.post("/users/courses/:courseId", checkTokenUser, async (req, res) => {
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

app.get("/users/purchasedCourses", checkTokenUser, async (req, res) => {
  // logic to view purchased courses
  let user = await USERS.findOne({ username: req.user.username }).populate(
    "purchasedCourses"
  );
  let purchasedCourses = user.purchasedCourses || [];

  return res.json({ purchasedCourses });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
