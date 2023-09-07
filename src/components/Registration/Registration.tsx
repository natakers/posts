import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, { memo } from "react";
import { UsersState } from "redux/reducers/user/userSlice";
import { useTypedSelector } from "hooks/useTypedSelector";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "hooks/useAppDispatch";
import { handleOpen } from "redux/reducers/modal/modalSlice";
import { useEffect } from "react";

const Registration = memo(() => {
  const dispatch = useAppDispatch()

  const handleSingUp = () => {
    dispatch(handleOpen({type: "signUp"}));
  };
  const handleSingIn = () => {
    dispatch(handleOpen({type: "signIn"}));
  };

  const navigate = useNavigate();
  const { token }: UsersState = useTypedSelector(state => state.user)

  useEffect(() => {
    if (token) navigate("/");
  }, [token])
  
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
