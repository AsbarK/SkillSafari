const mongoose = require("mongoose");
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

module.exports = {
  ADMINS,
  USERS,
  COURSES,
};
