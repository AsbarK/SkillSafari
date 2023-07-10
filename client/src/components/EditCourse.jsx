import React from "react";

function EditCourse(props) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [imgUrl, setImgUrl] = React.useState("");
  const [toggle, setToggle] = React.useState(false);
  function createCourseBtn() {
    fetch("http://localhost:3000/admin/courses/" + props.id, {
      method: "PUT",
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
    <>
      {toggle && (
        <>
          Title -{" "}
          <input
            type="text"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          Description -{" "}
          <input
            type="text"
            required
            onChange={(e) => setDescription(e.target.value)}
          />
          Price -{" "}
          <input
            type="number"
            required
            onChange={(e) => setPrice(e.target.value)}
          />
          Image-Url -{" "}
          <input
            type="text"
            required
            onChange={(e) => setImgUrl(e.target.value)}
          />
        </>
      )}{" "}
      <button
        onClick={() => {
          if (title == null || description == null || price == null) {
            setToggle(false);
          }
          if (toggle) {
            createCourseBtn();
            setToggle(false);
          } else {
            setToggle(true);
          }
        }}
      >
        Update Course
      </button>
    </>
  );
}

export default EditCourse;
