import Spinner from "../../components/Spinner";
import Sort from "../../components/Sort/sort";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { PostProps } from "types/contexTypes";
import CardList from "components/CardList/cardList";
import { useTypedSelector } from "hooks/useTypedSelector";
import { PostsState } from "redux/reducers/posts/postsSlice";
import { handleOpen } from "redux/reducers/modal/modalSlice";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useEffect, useState } from "react";

export const MainPage = ({ token }: MainPageProps) => {
  const { posts, error, loading }: PostsState = useTypedSelector(state => state.posts)
  const [cards, setCards] = useState<PostProps[]>([])
  const [currentSort, setCurrentSort] = useState<string>("По дате")
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    setCards([...posts])
  }, [posts])

  useEffect(() => {
    if (!token) {
      navigate("/login");  
    }
  }, [])
  if (currentSort === "По дате") {
    cards.sort((item, item1) => {
      if (item1.created_at.toLowerCase() < item.created_at.toLowerCase()) { return -1; }
      if (item1.created_at.toLowerCase() > item.created_at.toLowerCase()) { return 1; }
      return 0;
    });
  }
  if (currentSort === "По названию") {
    cards.sort((item, item1) => {
      if (item.title.toLowerCase() < item1.title.toLowerCase()) { return -1; }
      if (item.title.toLowerCase() > item1.title.toLowerCase()) { return 1; }
      return 0;
    });
  }
  if (currentSort === "Популярные") { cards.sort((item, item1) => item1.likes.length - item.likes.length); }
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2,}}>
        <Sort setCurrentSort={setCurrentSort} />
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
  token: string | null
}
