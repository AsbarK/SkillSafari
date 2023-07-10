import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Typography, CardMedia, CardContent } from "@mui/material";

function SingleCourse() {
  const { id } = useParams();
  const [coursePurchased, setCoursePurchased] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/users/courses/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCoursePurchased(data.course);
      });
  }, []);
  return (
    <center>
      <Card
        sx={{ backgroundColor: "#FCAEAE", width: "70%", marginTop: "10px" }}
      >
        <img
          src={coursePurchased.imageLink}
          alt={coursePurchased.title}
          height="300px"
          style={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h1" sx={{ color: "#2D4356" }}>
            {coursePurchased.title}
          </Typography>
          <Typography variant="h3" sx={{ color: "#2D4356" }}>
            {coursePurchased.description}
          </Typography>
        </CardContent>
      </Card>
    </center>
  );
}

export default SingleCourse;
