import { useContext } from "react";
import CardList from "../../components/CardList/cardList";
import Spinner from "../../components/Spinner";
import Sort from "../../components/Sort/sort";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ModalContext } from "../../context/modalContext";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

export const MainPage = ({ cards, onChangeSort, currentSort }) => {
  console.log("main");

  const { currentUser, isLoading, token } = useContext(UserContext);
  const { handleOpen } = useContext(ModalContext);

  const navigate = useNavigate();
  console.log(token);
  if (!token) {
    navigate("/login");  
  }

  if (currentSort === "По дате") {
    cards = cards.sort((item, item1) => {
      if (item1.created_at.toLowerCase() < item.created_at.toLowerCase()) {
        return -1;
      }
      if (item1.created_at.toLowerCase() > item.created_at.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  }
  if (currentSort === "По названию") {
    cards = cards.sort((item, item1) => {
      if (item.title.toLowerCase() < item1.title.toLowerCase()) {
        return -1;
      }
      if (item.title.toLowerCase() > item1.title.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  }
  if (currentSort === "Популярные") {
    cards = cards.sort((item, item1) => item1.likes.length - item.likes.length);
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Sort onChangeSort={onChangeSort} />
        <Button
        onClick={() => handleOpen('post_modal', "create")}
        variant="contained"
        sx={{
          backgroundColor: "#00718f",
          marginLeft: "20px",
          ":hover": { bgcolor: "#58641a", color: "white" },
        }}
      >
        Создать пост
      </Button>
      </Box>

      {!isLoading && cards && cards.length > 0 ? (
        <CardList posts={cards} currentUser={currentUser} />
      ) : (
        <Spinner />
      )}
    </>
  );
};
