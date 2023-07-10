import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PurchasedCourses() {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/users/purchasedCourses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setPurchasedCourses(data.purchasedCourses));
  }, [purchasedCourses]);

  return (
    <>
      {purchasedCourses.map((pc, index) => {
        return (
          <Course
            key={index}
            title={pc.title}
            description={pc.description}
            price={pc.price}
            id={pc._id}
          ></Course>
        );
      })}
    </>
  );
}

function Course(props) {
  return (
    <Link to={"/purchasedCourses/" + props.id}>
      <div>
        <h1>{props.title}</h1>
        <h4>{props.description}</h4>
        <h6>{props.price}</h6>
      </div>
    </Link>
  );
}

export default PurchasedCourses;
