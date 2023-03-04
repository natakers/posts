import { isLiked } from "../../utils";
import "./index.css";
import { ReactComponent as Save } from "./save.svg";
import { ReactComponent as Delete } from "./del.svg";

const Card = ({
  post,
  onPostLike,
  onPostDelete,
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
    onPostLike(post);
  }

  function handleDeleteClick() {
    onPostDelete(post);
  }

  return (
    <div className="card">
      <div className="card__buttons">
        <button
          className={
            liked ? "card__favorite card__favorite_is-active" : "card__favorite"
          }
          onClick={handleLikeClick}
        >
          <Save className="card__favorite-icon" />
          <span>{likes.length}</span>
        </button>
        <button className={"card__favorite"} onClick={handleDeleteClick}>
          <Delete className="card__favorite-icon" />
        </button>
      </div>

      <a href="/product" className="card__link">
        <img src={image} alt={title} className="card__image" />
        <div className="card__sticky card__sticky_type_top-right"></div>
        <div className="card__desc">
          <p className="card__name">{title}</p>
          <p className="card__name">{text}</p>
        </div>
      </a>
    </div>
  );
};

export default Card;
