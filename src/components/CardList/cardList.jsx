import PostCard from "../Card/card";
import "./index.css";

const CardList = ({ posts, onPostLike, onPostDelete, currentUser }) => {
  return (
    <div className="cards">
      {posts &&
        posts.map((item, index) => (
          <PostCard
            key={index}
            {...item}
            post={item}
            onPostLike={onPostLike}
            onPostDelete={onPostDelete}
            currentUser={currentUser}
          />
        ))}
    </div>
  );
};

export default CardList;
