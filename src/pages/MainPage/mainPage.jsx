import CardList from "../../components/CardList/cardList";
import Spinner from "../../components/Spinner";

export const MainPage = ({
  cards,
  onPostLike,
  onPostDelete,
  currentUser,
  isLoading,
}) => {
  return (
    <>
      {!isLoading && cards && cards.length > 0 ? (
        <CardList
          posts={cards}
          onPostLike={onPostLike}
          onPostDelete={onPostDelete}
          currentUser={currentUser}
        />
      ) : (
        <Spinner />
      )}
    </>
  );
};
