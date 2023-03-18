import PostCard from "../Card/card";
import "./index.css";


const CardList = ({ posts }) => {
  console.log("cardlist");

  return (
    <div className="cards">
      {posts &&
        posts.map((item, index) => (
          <PostCard
            key={index}
            {...item}
            post={item}
          />
        ))}
    </div>
  );
};

export default CardList;
