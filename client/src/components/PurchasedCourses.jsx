import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Typography, Box } from "@mui/material";
import axios from "axios";
function PurchasedCourses() {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  useEffect(() => {
    // fetch("http://localhost:3000/users/purchasedCourses", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: localStorage.getItem("token"),
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => setPurchasedCourses(data.purchasedCourses));
    axios
      .get("http://localhost:3000/users/purchasedCourses", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => setPurchasedCourses(res.data.purchasedCourses));
  }, [purchasedCourses]);

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
      {purchasedCourses.map((pc, index) => {
        return (
          <Course
            key={index}
            title={pc.title}
            description={pc.description}
            price={pc.price}
            id={pc._id}
            img={pc.imageLink}
          ></Course>
        );
      })}
    </Box>
  );
}

function Course(props) {
  return (
    <center>
      <Link to={"/purchasedCourses/" + props.id}>
        <Card
          sx={{
            backgroundColor: "#1D267D",
            border: "solid black 1px",
            borderRadius: "20px",
            width: "400px",
            height: "300px",
          }}
        >
          <img
            src={props.img}
            alt={props.title}
            height="200px"
            style={{ objectFit: "cover", borderRadius: "10px" }}
          />
          <Typography variant="h5" sx={{ color: "#DDE6ED" }}>
            {props.title}
          </Typography>
          <Typography variant="h8" sx={{ color: "#DDE6ED" }}>
            {props.description}
          </Typography>
        </Card>
      </Link>
    </center>
  );
}

export default PurchasedCourses;
