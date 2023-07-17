import { Button, TextField, Grid } from "@mui/material";
import React from "react";
import axios from "axios";

function EditCourse(props) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [imgUrl, setImgUrl] = React.useState("");
  const [editing, setEditing] = React.useState(false);

  async function createCourseBtn() {
    // fetch("http://localhost:3000/admin/courses/" + props.id, {
    //   method: "PUT",
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
        "http://localhost:3000/admin/courses/" + props.id,
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

  const handleToggle = () => {
    setEditing((prevEditing) => !prevEditing);
    if (!editing) {
      setTitle("");
      setDescription("");
      setPrice("");
      setImgUrl("");
    }
  };

  const handleUpdateCourse = () => {
    if (title === "" || description === "" || price === "") {
      return;
    }
    createCourseBtn();
    handleToggle();
  };

  return (
    <>
      {editing && (
        <div
          style={{
            backgroundColor: "#176B87",
            margin: "15px 20px 5px",
            borderRadius: "20px",
            border: "solid black 1px",
            padding: "1rem",
            marginBottom: "10px",
            width: "90%",
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
                value={title}
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
                value={description}
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
                value={price}
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
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
              />
            </Grid>
          </Grid>
        </div>
      )}
      <Button
        style={{ backgroundColor: "#DAFFFB", color: "#001C30", margin: "1rem" }}
        variant="outlined"
        onClick={handleToggle}
      >
        {editing ? "Cancel" : "Update Course"}
      </Button>
      {editing && (
        <Button
          style={{
            backgroundColor: "#DAFFFB",
            color: "#001C30",
            margin: "1rem",
          }}
          variant="outlined"
          onClick={handleUpdateCourse}
        >
          Save Changes
        </Button>
      )}
    </>
  );
}

export default EditCourse;
