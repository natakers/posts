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
import { UserContext } from "../../context/userContext";
import { PostContext } from "../../context/postContext";
import { ModalContext } from "../../context/modalContext";
import ModalBase from "../Modal/ModalBase";
import LoginPage from "../../pages/LoginPage/loginPage";

const App = () => {
  console.log("app");

  const [currentUser, setCurrentUser] = useState({});
  const [currentPost, setCurrentPost] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [currentSort, setCurrentSort] = useState("");
  const [currentComment, setCurrentComment] = useState(null);
  const [currentCommentList, setCurrentCommentList] = useState(null);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const [secondType, setsecondType] = useState("");
  const [token, setToken] = useState(null);

  const handleClose = () => {
    setType("");
    setOpen(false);
  };
  const handleOpen = (type, secondType = "") => {
    setType(type);
    setsecondType(secondType);
    setOpen(true);
  };
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (token) {
      setLoading(true);
      api._token = `Bearer ${token}`;
      Promise.all([api.getPostList(), api.getUserInfo()])
        .then(([poststData, userData]) => {
          setCurrentUser(userData);
          setCards(poststData);
          
        })
        .catch((err) => alert(err));
        setLoading(false);
    }
  }, [token]);

  function handleUpdateUser(userUpdate) {
    setLoading(true);
    api
      .setUserInfo(userUpdate)
      .then((newUserData) => {
        setCurrentUser(newUserData);
      })
      .catch((err) => alert(err));
  }
  function handleUpdateAvatar(avatar) {
    api
      .setUserAvatar(avatar)
      .then((newUserAvatar) => {
        setCurrentUser(newUserAvatar);
      })
      .then((res) => {
        api.getPostList().then((poststData) => {
          setCards(poststData);
        });
      })
      .catch((err) => alert(err));
      setLoading(false);
  }

  function handlePostLike(post) {
    const isLiked = post.likes.some((id) => id === currentUser._id); //ищем в массиве лайков id текущего пользователя;
    api
      .changeLikePostStatus(post._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => {
          return c._id === newCard._id ? newCard : c;
        });
        setCards(newCards);
      })
      .catch((err) => alert(err));
  }

  const handlePostDelete = async () => {
    try {
      setLoading(true);
      await api.deletePost(currentPost._id);
      const poststData = await api.getPostList();
      setCards(poststData);
      
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };

  const handleCommentDelete = async () => {
    try {
      setLoading(true);
      await api.deleteComment(currentPost._id, currentComment);
      let result = await api.getComments(currentPost._id);
      setCurrentCommentList(result.reverse());
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };

  const onChangeSort = (id) => {
    setCurrentSort(id);
  };

  const handleDeleteUser = () => {
    setToken(null);
    localStorage.setItem("token", "");
    setCurrentUser({});
  };

  return (
    <UserContext.Provider
      value={{
        user: currentUser,
        isLoading,
        handleUpdateUser,
        handleUpdateAvatar,
        token,
        setToken,
        handleDeleteUser,
      }}
    >
      <PostContext.Provider
        value={{
          handlePostLike,
          handlePostDelete,
          currentPost,
          setCurrentPost,
          handleCommentDelete,
          currentComment,
          setCurrentComment,
          currentCommentList,
          setCurrentCommentList,
        }}
      >
        <ModalContext.Provider
          value={{
            open,
            setOpen,
            handleOpen,
            handleClose,
            type,
            secondType,
            setType,
            setCards,
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              height: "100vh",
            }}
          >
            <Header onUpdateUser={handleUpdateUser}></Header>
            <Container
              sx={{ marginTop: "20px", marginBottom: "20px", flexGrow: 1 }}
            >
              <Routes>
                <Route
                  index
                  element={
                    <MainPage
                      cards={cards}
                      onChangeSort={onChangeSort}
                      currentSort={currentSort}
                    />
                  }
                />
                <Route path="/post/:postId" element={token && <PostPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Container>
            <ModalBase />
            <Footer />
          </Box>
        </ModalContext.Provider>
      </PostContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
