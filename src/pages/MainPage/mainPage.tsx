import { useContext } from "react";

import Spinner from "../../components/Spinner";
import Sort from "../../components/Sort/sort";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ModalContext } from "../../context/modalContext";
import { useNavigate } from "react-router-dom";
import { PostProps } from "types/contexTypes";
import CardList from "components/CardList/cardList";
import { useTypedSelector } from "hooks/useTypedSelector";

export const MainPage = ({ token, cards, onChangeSort, currentSort }: MainPageProps) => {
  const { handleOpen } = useContext(ModalContext);
  const { error, loading } = useTypedSelector(state => state.posts)

  const navigate = useNavigate();

  if (!token) {
    navigate("/login");  
  }
  if (currentSort === "По дате") {
    cards = cards.sort((item, item1) => {
      if (item1.created_at.toLowerCase() < item.created_at.toLowerCase()) { return -1; }
      if (item1.created_at.toLowerCase() > item.created_at.toLowerCase()) { return 1; }
      return 0;
    });
  }
  if (currentSort === "По названию") {
    cards = cards.sort((item, item1) => {
      if (item.title.toLowerCase() < item1.title.toLowerCase()) { return -1; }
      if (item.title.toLowerCase() > item1.title.toLowerCase()) { return 1; }
      return 0;
    });
  }
  if (currentSort === "Популярные") { cards = cards.sort((item, item1) => item1.likes.length - item.likes.length); }
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2,}}>
        <Sort onChangeSort={onChangeSort} />
        <Button
        onClick={() => handleOpen('post_modal', "create")}
        variant="contained"
        sx={{ backgroundColor: "#00718f", marginLeft: "20px", ":hover": { bgcolor: "#58641a", color: "white" },}}>
        Создать пост
      </Button>
      </Box>
      {(!loading && cards && cards.length > 0 ) ? ( <CardList posts={cards} /> ) : ( (error === '') ? <Spinner /> : <div>{error}</div> )}
    </>
  );
};

interface MainPageProps {
  cards: Array<PostProps>, 
  onChangeSort: (id: string) => void, 
  currentSort: string,
  token: string | null
}
