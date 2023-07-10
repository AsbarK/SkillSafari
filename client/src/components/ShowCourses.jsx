import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditCourse from "./EditCourse";
import { Button, Card, Typography } from "@mui/material";

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
    <center>
      <Typography variant="h1" sx={{ color: "#2D4356", marginTop: "8px" }}>
        Course Page
      </Typography>
      {courses.map((c, index) => (
        <Course
          key={index}
          title={c.title}
          description={c.description}
          price={c.price}
          img={c.imageLink}
          id={c._id}
          role={props.role}
        />
      ))}
      {props.role === "users" && (
        <Button
          variant="contained"
          onClick={() => navigate("/purchasedCourses")}
        >
          Click Here To See PURCHASED COURSES!
        </Button>
      )}
    </center>
  );
}

function Course(props) {
  return (
    <>
      <Card
        sx={{
          backgroundColor: "#FCAEAE",
          border: "solid black 1px",
          borderRadius: "20px",
          height: "100px",
          display: "flex",
          flexWrap: "wrap",
          margin: "10px 30px 10px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img
          src={props.img}
          alt={props.title}
          height="100px"
          style={{ objectFit: "cover", borderRadius: "100px" }}
        />
        <Typography variant="h5" sx={{ color: "#2D4356" }}>
          {props.title}
        </Typography>
        <Typography variant="h8" sx={{ color: "#2D4356" }}>
          {"$" + props.price}
        </Typography>

        {props.role === "users" && (
          <Button
            variant="contained"
            sx={{ height: "100%" }}
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
          </Button>
        )}
      </Card>
      {props.role === "admin" && <EditCourse id={props.id} />}
    </>
  );
}

export default ShowCourses;
