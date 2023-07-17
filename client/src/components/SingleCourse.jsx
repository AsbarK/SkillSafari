import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Typography, CardContent } from "@mui/material";
import axios from "axios";
function SingleCourse() {
  const { id } = useParams();
  const [coursePurchased, setCoursePurchased] = useState([]);
  if (!id) {
    alert("Invalid ID");
  }
  useEffect(() => {
    // fetch("http://localhost:3000/users/courses/" + id, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: localStorage.getItem("token"),
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setCoursePurchased(data.course);
    //   });
    axios
      .get("http://localhost:3000/users/courses/" + id, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCoursePurchased(res.data.course);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <center>
      <Card
        sx={{ backgroundColor: "#1D267D", width: "70%", marginTop: "10px" }}
      >
        <img
          src={coursePurchased.imageLink}
          alt={coursePurchased.title}
          height="300px"
          style={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h1" sx={{ color: "#DDE6ED" }}>
            {coursePurchased.title}
          </Typography>
          <Typography variant="h3" sx={{ color: "#DDE6ED" }}>
            {coursePurchased.description}
          </Typography>
        </CardContent>
      </Card>
    </center>
  );
}

export default SingleCourse;
