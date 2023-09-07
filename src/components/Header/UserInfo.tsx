import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { UsersState } from "redux/reducers/user/userSlice";
import { useTypedSelector } from "hooks/useTypedSelector";
import { useAppDispatch } from "hooks/useAppDispatch";
import { setUserInfo } from "redux/reducers/user/user_action_creators";
import { handleOpen } from "redux/reducers/modal/modalSlice";

const UserInfo = () => {
  const [isShow, setisShow] = useState<boolean>(false);
  const [nameUser, setName] = useState<string>('');
  const [aboutUser, setAbout] = useState<string>('');
  const { currentUser }: UsersState = useTypedSelector(state => state.user)
  const dispatch = useAppDispatch()

  const handleClickButtonEdit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setisShow(false);
    dispatch(setUserInfo({
      name: nameUser,
      about: aboutUser,
    }));
  };

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setAbout(currentUser.about);
    }
  }, [currentUser]);

  const handleOpenModal = () => {
    dispatch(handleOpen({type: "update_user"}));
  };

  const handleOut = () => {
    dispatch(handleOpen({ type: "confirm", secondType: 'user'}));
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Tooltip title="Open settings">
        <Avatar alt="avatar" src={currentUser ? currentUser.avatar : ''} />
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
        {currentUser && (
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
