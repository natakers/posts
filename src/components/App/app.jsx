import { useState, useEffect } from "react";
import Footer from "../Footer/footer";
import Header from "../Header/header";
import CardList from "../CardList/cardList";
import Spinner from "../Spinner/index";
import "./index.css";
import api from "../../Api";

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo().then((userData) => {
      setCurrentUser(userData);
    });
    api.getPostList().then((poststData) => {
      setCards(poststData);
    });
  }, []);

  function handlePostLike(post) {
    const isLiked = post.likes.some((id) => id === currentUser._id); //ищем в массиве лайков id текущего пользователя;
    api.changeLikePostStatus(post._id, !isLiked).then((newCard) => {
      const newCards = cards.map((c) => {
        return c._id === newCard._id ? newCard : c;
      });
      setCards(newCards);
    });
  }

  return (
    <>
      <Header user={currentUser}></Header>
      <main className="content container">
        {cards && cards.length > 0 ? (
          <CardList
            posts={cards}
            onPostLike={handlePostLike}
            currentUser={currentUser}
          />
        ) : (
          <Spinner />
        )}
      </main>
      <Footer />
    </>
  );
};

export default App;
