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
import { useNavigate } from 'react-router-dom'
import type { CommentProps, PostProps, UserProps, UserUpdateProps } from "types/contexTypes";

const App = () => {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
  const [currentPost, setCurrentPost] = useState<PostProps | null>(null);
  const [cards, setCards] = useState<PostProps[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [currentSort, setCurrentSort] = useState<string>("");
  const [currentComment, setCurrentComment] = useState<string>('');
  const [currentCommentList, setCurrentCommentList] = useState<CommentProps[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
  const [secondType, setsecondType] = useState<string>("");
  const [token, setToken] = useState<string | null>(localStorage.getItem("tokenPosts"));

  const handleClose = () => {
    setType("");
    setOpen(false);
  };
  const handleOpen = (type: string, secondType = "") => {
    setType(type);
    setsecondType(secondType);
    setOpen(true);
  };
  useEffect(() => {
    setToken(localStorage.getItem("tokenPosts"));
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
    } else navigate('/login')
  }, [token, navigate]);

  function handleUpdateUser(userUpdate: UserUpdateProps) {
    setLoading(true);
    api
      .setUserInfo(userUpdate)
      .then((newUserData) => {
        setCurrentUser(newUserData);
      })
      .catch((err) => alert(err));
  }
  function handleUpdateAvatar(avatar: string) {
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

  function handlePostLike(post: PostProps) {
    const isLiked = post.likes.some((id: string) => currentUser ? id === currentUser._id : ''); //ищем в массиве лайков id текущего пользователя;
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
      if (currentPost) {
        await api.deletePost(currentPost._id);
        const poststData = await api.getPostList();
        setCards(poststData);
      }
      
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };

  const handleCommentDelete = async () => {
    try {
      setLoading(true);
      if (currentPost) {
        await api.deleteComment(currentPost._id, currentComment);
        let result = await api.getComments(currentPost._id);
        setCurrentCommentList(result.reverse());
      }
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };

  const onChangeSort = (id: string) => {
    setCurrentSort(id);
  };

  const handleDeleteUser = () => {
    setToken(null);
    localStorage.setItem("tokenPosts", "");
    setCurrentUser(null);
    navigate('/login')
  };

  return (
    <UserContext.Provider value={{user: currentUser, isLoading, handleUpdateUser, handleUpdateAvatar, token, setToken, handleDeleteUser }}>
      <PostContext.Provider
        value={{handlePostLike,handlePostDelete,currentPost,setCurrentPost,handleCommentDelete,currentComment,setCurrentComment,currentCommentList,setCurrentCommentList}}>
        <ModalContext.Provider
          value={{open, setOpen, handleOpen, handleClose, type, secondType, setType, setCards}}>
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
                <Route index element={<MainPage cards={cards} onChangeSort={onChangeSort} currentSort={currentSort}/>}/>
                <Route path="/post/:postId" element={token && <PostPage token={token} />} />
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
