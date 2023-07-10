import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Register from "./Register";
import LoginUser from "./Login-user";
import LoginAdmin from "./Login-admin";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Card } from "@mui/material";
const theme = createTheme({
  palette: {
    secondary: {
      main: "#FF8989",
    },
  },
});

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <center
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, width: "60vw", height: "50vh" }}>{children}</Box>
      )}
    </center>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function AuthTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <center>
      <ThemeProvider theme={theme}>
        <Box sx={{ width: "100%", height: "100%" }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="auth templates"
              textColor="secondary"
              indicatorColor="secondary"
            >
              <Tab
                label="Register"
                sx={{ color: "#FF8989" }}
                {...a11yProps(0)}
              />
              <Tab
                label="Login User"
                sx={{ color: "#FF8989" }}
                {...a11yProps(1)}
              />
              <Tab
                label="Login Admin"
                sx={{ color: "#FF8989" }}
                {...a11yProps(2)}
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Landing tab={"register"} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Landing tab={"login-user"} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Landing tab={"login-admin"} />
          </CustomTabPanel>
        </Box>
      </ThemeProvider>
    </center>
  );
}
/// This is the landing page. You need to add a link to the login page here.
/// Maybe also check from the backend if the user is already logged in and then show them a logout button
/// Logging a user out is as simple as deleting the token from the local storage.

function Landing(props) {
  return (
    <Card sx={{ backgroundColor: "#FCAEAE", marginTop: "20vh" }}>
      <Typography variant="h3" sx={{ color: "#2D4356", marginTop: "8px" }}>
        Welcome to course selling website!
      </Typography>
      {props.tab === "register" && <Register />}
      {props.tab === "login-user" && <LoginUser />}
      {props.tab === "login-admin" && <LoginAdmin />}
    </Card>
  );
}

export default AuthTabs;
