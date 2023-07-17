import React from "react";
import ShowCourses from "./ShowCourses";
import { Button, TextField, Typography, Card, Grid } from "@mui/material";
import axios from "axios";

function CreateCourse() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [imgUrl, setImgUrl] = React.useState("");
  // const [editing, setEditing] = React.useState(false);

  async function createCourseBtn() {
    if (title === "" || description === "" || price === "") {
      return;
    }
    // fetch("http://localhost:3000/admin/courses", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: localStorage.getItem("token"),
    //   },
    //   body: JSON.stringify({
    //     title,
    //     description,
    //     price,
    //     imageLink: imgUrl,
    //     published: true,
    //   }),
    // }).catch((err) => console.log(err));
    await axios
      .put(
        "http://localhost:3000/admin/courses",
        {
          title,
          description,
          price,
          imageLink: imgUrl,
          published: true,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .catch((err) => console.log(err));
  }

  // const handleCreateCourseToggle = () => {
  //   setEditing((prevEdit) => !prevEdit);
  //   if (!editing) {
  //     setTitle("");
  //     setDescription("");
  //     setPrice("");
  //     setImgUrl("");
  //   }
  // };
  // const handleCreateCourse = () => {
  //   if (title === "" || description === "" || price === "") {
  //     return;
  //   }
  //   handleCreateCourseToggle();
  //   createCourseBtn();
  // };
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <center>
        <Typography variant="h3" sx={{ color: "#DDE6ED" }}>
          Create Course
        </Typography>

        <Card
          sx={{
            backgroundColor: "#176B87",
            border: "solid #DAFFFB 1px",
            borderRadius: "20px",
            minHeight: "40%",
            padding: "1rem",
            width: "80%",
          }}
        >
          <Grid container spacing={2} direction="column">
            <Grid item>
              <TextField
                style={{ width: "90%", background: "#DAFFFB" }}
                type="text"
                fullWidth
                id="filled-required-Title"
                label="Title"
                required
                variant="filled"
                size="small"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                style={{ width: "90%", background: "#DAFFFB" }}
                type="text"
                fullWidth
                id="filled-required-Description"
                label="Description"
                required
                variant="filled"
                size="small"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                style={{ width: "90%", background: "#DAFFFB" }}
                type="number"
                fullWidth
                id="filled-required-Price"
                label="Price"
                required
                variant="filled"
                size="small"
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                style={{ width: "90%", background: "#DAFFFB" }}
                type="text"
                fullWidth
                id="filled-required-Image-Url"
                label="Image-Url"
                required
                variant="filled"
                size="small"
                onChange={(e) => setImgUrl(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Button
                style={{ backgroundColor: "#DAFFFB", color: "#001C30" }}
                variant="outlined"
                onClick={() => {
                  createCourseBtn();
                }}
              >
                Create Course
              </Button>
            </Grid>
          </Grid>
        </Card>
      </center>

      <ShowCourses role={"admin"} />
    </div>
  );
}

export default CreateCourse;
