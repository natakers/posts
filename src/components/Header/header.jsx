import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import AdbIcon from "@mui/icons-material/AutoAwesome";

const Header = ({ user, onUpdateUser }) => {
  const [isShow, setisShow] = useState(false);
  const [nameUser, setName] = useState("");
  const [aboutUser, setAbout] = useState("");
  const handleClickButtonEdit = (e) => {
    e.preventDefault();
    setisShow(false);
    onUpdateUser({ name: nameUser, about: aboutUser });
  };

  useEffect(() => {
    setName(user.name);
    setAbout(user.about);
  }, [user]);
  return (
    <AppBar position="static" sx={{ backgroundColor: "#013f4e" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: "flex", mr: 1 }} />
          <Box sx={{ flexGrow: 1, display: "flex" }}></Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Tooltip title="Open settings">
              <Avatar alt="avatar" src={user.avatar} />
            </Tooltip>
            <Box
              sx={{
                mt: 1,
                mb: 1,
                display: "flex",
                alignItems: "center",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              {user.email &&
                (isShow ? (
                  <TextField
                    hiddenLabel
                    id="userName"
                    variant="filled"
                    size="small"
                    sx={{ backgroundColor: "white", ml: 1 }}
                    value={nameUser}
                    onInput={(e) => {
                      setName(e.target.value);
                    }}
                  />
                ) : (
                  <Typography
                    variant="p"
                    noWrap
                    sx={{
                      ml: 1,
                      display: { xs: "flex" /* md: 'none'*/ },
                      fontFamily: "monospace",
                      fontWeight: 500,
                      color: "inherit",
                    }}
                  >
                    {nameUser}
                  </Typography>
                ))}
              {user.about &&
                (isShow ? (
                  <TextField
                    hiddenLabel
                    id="userAbout"
                    variant="filled"
                    size="small"
                    sx={{ backgroundColor: "white", ml: 1 }}
                    value={aboutUser}
                    onChange={(e) => {
                      setAbout(e.target.value);
                    }}
                  />
                ) : (
                  <Typography
                    variant="p"
                    noWrap
                    sx={{
                      ml: 1,
                      display: "flex",
                      fontFamily: "monospace",
                      fontWeight: 500,
                      color: "inherit",
                    }}
                  >
                    {aboutUser}
                  </Typography>
                ))}
            </Box>
            {!isShow ? (
              <Button
                onClick={() => setisShow(true)}
                variant="contained"
                sx={{
                  backgroundColor: "#00718f",
                  marginLeft: "20px",
                  ":hover": { bgcolor: "#58641a", color: "white" },
                }}
              >
                Изменить
              </Button>
            ) : (
              <Button
                onClick={handleClickButtonEdit}
                variant="contained"
                sx={{
                  backgroundColor: "#00718f",
                  marginLeft: "20px",
                  ":hover": { bgcolor: "#58641a", color: "white" },
                }}
              >
                Принять
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
