import Spinner from "../../components/Spinner";
import Sort from "../../components/Sort/sort";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { PostProps } from "types/contexTypes";
import CardList from "components/CardList/cardList";
import { useTypedSelector } from "hooks/useTypedSelector";
import { handleOpen } from "redux/reducers/modal/modalSlice";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useEffect } from "react";

export const MainPage = ({ token, cards, onChangeSort, currentSort }: MainPageProps) => {
  const { error, loading } = useTypedSelector(state => state.posts)
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");  
    }
  }, [])
  
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
        onClick={() => dispatch(handleOpen({type: 'post_modal', secondType: "create"}))}
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
