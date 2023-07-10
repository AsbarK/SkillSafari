import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditCourse from "./EditCourse";

function ShowCourses(props) {
  const [courses, setCourses] = React.useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:3000/" + props.role + "/courses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setCourses(data.courses));
  }, [courses]);
  // Add code to fetch courses from the server
  // and set it in the courses state variable.
  return (
    <div>
      <h1>Course Page</h1>
      {courses.map((c, index) => (
        <Course
          key={index}
          title={c.title}
          description={c.description}
          price={c.price}
          id={c._id}
          role={props.role}
        />
      ))}
      {props.role === "users" && (
        <button onClick={() => navigate("/purchasedCourses")}>
          Click Here To See PURCHASED COURSES!
        </button>
      )}
    </div>
  );
}

function Course(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <h4>{props.description}</h4>
      <h6>{props.price}</h6>
      {props.role === "users" && (
        <button
          onClick={() => {
            fetch("http://localhost:3000/users/courses/" + props.id, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
              },
            })
              .then((res) => res.json())
              .then((data) => alert(data.message));
          }}
        >
          Purchase
        </button>
      )}
      {props.role === "admin" && <EditCourse id={props.id} />}
    </div>
  );
}

export default ShowCourses;
