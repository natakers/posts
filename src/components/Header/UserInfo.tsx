import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { useContext } from "react";
import { ModalContext } from "../../context/modalContext";
import { UserContext } from "../../context/userContext";
import { UserUpdateProps } from "types/contexTypes";

const UserInfo: React.FC<{onUpdateUser: (userUpdate: UserUpdateProps) => void}> = ({ onUpdateUser }) => {
  const [isShow, setisShow] = useState<boolean>(false);
  const [nameUser, setName] = useState<string>('');
  const [aboutUser, setAbout] = useState<string>('');
  const { user } = useContext(UserContext);

  const handleClickButtonEdit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setisShow(false);
    onUpdateUser({
      name: nameUser,
      about: aboutUser,
    });
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
        <Avatar alt="avatar" src={user ? user.avatar : ''} />
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
              variant="inherit"
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
              variant="inherit"
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
