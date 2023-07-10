import { Routes, BrowserRouter, Route } from "react-router-dom";

import "./App.css";
import Landing from "./components/Landing";
import LoginUser from "./components/Login-user";
import Register from "./components/Register";
import ShowCourses from "./components/ShowCourses";
import PurchasedCourses from "./components/PurchasedCourses";
import SingleCourse from "./components/SingleCourse";
import LoginAdmin from "./components/Login-admin";
import CreateCourse from "./components/CreateCourse";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login-user" element={<LoginUser />} />
          <Route path="/login-admin" element={<LoginAdmin />} />
          <Route path="/create-course" element={<CreateCourse />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<ShowCourses role={"users"} />} />
          <Route path="/purchasedCourses" element={<PurchasedCourses />} />
          <Route path="/purchasedCourses/:id" element={<SingleCourse />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
