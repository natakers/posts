import { useState, useEffect } from "react";
import Footer from "../Footer/footer";
import Header from "../Header/header";
import "./index.css";
import api from "../../Api";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "../../pages/NotFoundPage/not-found-page";
import PostPage from "../../pages/PostPage/postPage";
import { MainPage } from "../../pages/MainPage/mainPage";
import ModalBase from "../Modal/ModalBase";
import LoginPage from "../../pages/LoginPage/loginPage";
import { useNavigate } from 'react-router-dom'
import { useTypedSelector } from "hooks/useTypedSelector";
import { useAppDispatch } from "hooks/useAppDispatch";
import { getPosts } from "redux/reducers/posts/post_action_creators";
import { getUserInfo } from "redux/reducers/user/user_action_creators";
import { UsersState } from "redux/reducers/user/userSlice";

const App = () => {
  const navigate = useNavigate()
  const { token }: UsersState = useTypedSelector(state => state.user)
  const dispatch = useAppDispatch()
  

  useEffect(() => {
    if (token) {
      api._token = `Bearer ${token}`;
      dispatch(getPosts())
      dispatch(getUserInfo())
    } else navigate('/login')
    // eslint-disable-next-line
  }, [token]);

  return (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              height: "100vh",
            }}
          >
            <Header></Header>
            <Container
              sx={{ marginTop: "20px", marginBottom: "20px", flexGrow: 1 }}
            >
              <Routes>
                <Route index element={<MainPage token={token}/>}/>
                <Route path="/post/:postId" element={token && <PostPage token={token} />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Container>
            <ModalBase />
            <Footer />
          </Box>
  );
};

export default App;
