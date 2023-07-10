import React from "react";
import ShowCourses from "./ShowCourses";

function CreateCourse() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");

  function createCourseBtn() {
    let imgUrl = document.getElementById("urlimg").value;
    fetch("http://localhost:3000/admin/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title,
        description,
        price,
        imageLink: imgUrl,
        published: true,
      }),
    }).catch((err) => console.log(err));
  }

  return (
    <div>
      <h1>Create Course</h1>
      Title - <input type="text" onChange={(e) => setTitle(e.target.value)} />
      Description -{" "}
      <input type="text" onChange={(e) => setDescription(e.target.value)} />
      Price - <input type="number" onChange={(e) => setPrice(e.target.value)} />
      Image-Url - <input type="text" id="urlimg" />
      <button onClick={createCourseBtn}>Create Course</button>
      <ShowCourses role={"admin"} />
    </div>
  );
}

export default CreateCourse;
