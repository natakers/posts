import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { useContext } from "react";
import { ModalContext } from "../../context/modalContext";

const UserInfo = ({ user, onUpdateUser }) => {
  console.log("userInfo");
  const [isShow, setisShow] = useState(false);
  const [nameUser, setName] = useState(undefined);
  const [aboutUser, setAbout] = useState(undefined);

  const handleClickButtonEdit = (e) => {
    e.preventDefault();
    setisShow(false);
    onUpdateUser({ name: nameUser, about: aboutUser });
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setAbout(user.about);
    }
  }, [user]);

  const { handleOpen } = useContext(ModalContext);

  const handleOpenModal = () => {
    handleOpen("update_user");
  };

  const handleOut = () => {
    handleOpen("confirm", 'user');
  };
  
  return (
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
        {user && (
          <>
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
          </>
        )}
      </Box>
      {!isShow ? (
        <Button
          onClick={() => handleOpenModal()}
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
      <Button
        onClick={handleOut}
        variant="contained"
        sx={{
          backgroundColor: "#00718f",
          marginLeft: "20px",
          ":hover": { bgcolor: "#58641a", color: "white" },
        }}
      >
        Выйти
      </Button>
    </Box>
  );
};

export default UserInfo;
