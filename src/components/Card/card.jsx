import { isLiked } from "../../utils";
import "./index.css";
import { ReactComponent as Save } from "./save.svg";

const Card = ({
  post,
  onPostLike,
  currentUser,
  title,
  text,
  image,
  author,
  likes,
  _id,
}) => {
  const liked = isLiked(likes, currentUser._id);

  function handleLikeClick() {
    console.log(post);
    onPostLike(post);
  }
  return (
    <div className="card">
      <a href="/product" className="card__link">
        <img src={image} alt={title} className="card__image" />
        <div className="card__sticky card__sticky_type_top-right">
          <button
            className={
              liked
                ? "card__favorite card__favorite_is-active"
                : "card__favorite"
            }
            onClick={handleLikeClick}
          >
            <Save className="card__favorite-icon" />
            <span>{likes.length}</span>
          </button>
        </div>
        <div className="card__desc">
          <p className="card__name">{title}</p>
          <p className="card__name">{text}</p>
        </div>
      </a>
    </div>
  );
};

export default Card;
