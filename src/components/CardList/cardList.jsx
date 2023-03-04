import Card from "../Card/card";
import "./index.css";

const CardList = ({ posts, onPostLike, currentUser }) => {

  return (
    <div className="cards">
      {posts &&
        posts.map((item, index) => (
          <Card
            key={index}
            {...item}
            post={item}
            onPostLike={onPostLike}
            currentUser={currentUser}
          />
        ))}
    </div>
  );
};

export default CardList;
