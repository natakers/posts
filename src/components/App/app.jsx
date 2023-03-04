import { useState, useEffect } from "react";
import Footer from "../Footer/footer";
import Header from "../Header/header";
import "./index.css";
import api from "../../Api";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "../../pages/NotFoundPage/not-found-page";
import PostPage from "../../pages/PostPage/postPage";
import { MainPage } from "../../pages/MainPage/mainPage";

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setLoading(true)
    api.getUserInfo().then((userData) => {
      setCurrentUser(userData);
    });
    api.getPostList().then((poststData) => {
      setCards(poststData);
      setLoading(false)
    });
  }, []);

  function handleUpdateUser(userUpdate) {
    api.setUserInfo(userUpdate).then((newUserData) => {
      setCurrentUser(newUserData);
    });
  }

  function handlePostLike(post) {
    const isLiked = post.likes.some((id) => id === currentUser._id); //ищем в массиве лайков id текущего пользователя;
    api.changeLikePostStatus(post._id, !isLiked).then((newCard) => {
      const newCards = cards.map((c) => {
        return c._id === newCard._id ? newCard : c;
      });
      setCards(newCards);
    });
  }

  function handlePostDelete(post) {
    setLoading(true)
    api.deletePost(post._id).then((res) => {
    api.getPostList().then((poststData) => {
      setCards(poststData);
      setLoading(false)
    });
    });
  }

  return (
    <Box sx={{width: "100%", display: "flex", flexDirection: "column", flexGrow: 1, height: "100vh"}}>
      <Header user={currentUser} onUpdateUser={handleUpdateUser}></Header>
      <Container sx={{marginTop: "20px", marginBottom: "20px", flexGrow: 1}}>
        <Routes>
          <Route index element={
            <MainPage 
            cards={cards} 
            onPostLike={handlePostLike}
            onPostDelete={handlePostDelete}
            currentUser={currentUser}
            isLoading={isLoading}/>
          }/>
          <Route path="/post/:postId" element={
            <PostPage currentUser={currentUser} onPostDelete={handlePostDelete} onPostLike={handlePostLike}/>
          }/>
          <Route path="*" element={
            <NotFoundPage/>
          }/>
        </Routes>
      </Container>
      <Footer />
    </Box>
  );
};

export default App;
