import CardList from "../../components/CardList/cardList";
import Spinner from "../../components/Spinner";
import Sort from "../../components/Sort/sort";
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';

export const MainPage = ({ cards, onChangeSort, currentSort }) => {
  console.log("main");
  console.log(currentSort);

  const { currentUser, isLoading } = useContext(UserContext);

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
    console.log(cards);
    cards = cards.sort((item, item1) => item1.likes.length - item.likes.length);
  }
  console.log(cards);
  return (
    <>
      <Sort onChangeSort={onChangeSort} />
      {!isLoading && cards && cards.length > 0 ? (
        <CardList posts={cards} currentUser={currentUser} />
      ) : (
        <Spinner />
      )}
    </>
  );
};
