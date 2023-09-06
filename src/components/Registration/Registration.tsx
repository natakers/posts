import { useContext } from "react";
import { ModalContext } from "../../context/modalContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, { memo } from "react";
import { UsersState } from "redux/reducers/user/userSlice";
import { useTypedSelector } from "hooks/useTypedSelector";
import { useNavigate } from "react-router-dom";

const Registration = memo(() => {

  const handleSingUp = () => {
    handleOpen("signUp");
  };
  const { handleOpen } = useContext(ModalContext);
  const handleSingIn = () => {
    handleOpen("signIn");
  };

  const navigate = useNavigate();
  const { token }: UsersState = useTypedSelector(state => state.user)

  if (token) navigate("/");
  
  return (
    <Box
      sx={{ mt: 1, mb: 1, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: { xs: "column", md: "row" },}}>
      <Button onClick={handleSingUp} variant="contained" sx={{ backgroundColor: "#00718f", margin: "10px", ":hover": { bgcolor: "#58641a", color: "white" }, }}>
        Регистрация
      </Button>
      <Button onClick={handleSingIn} variant="contained" sx={{ backgroundColor: "#00718f", margin: "10px", ":hover": { bgcolor: "#58641a", color: "white" }, }}>
        Авторизация
      </Button>
    </Box>
  );
});

export default Registration;
