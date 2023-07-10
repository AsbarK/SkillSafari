import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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
    <>
      <h1>{coursePurchased.title}</h1>
      <h3>{coursePurchased.description}</h3>
      <img src={coursePurchased.imageLink} alt="IMG" />
    </>
  );
}

export default SingleCourse;
