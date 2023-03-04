import { isLiked } from "../../utils";
import "./index.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Delete from "@mui/icons-material/Delete";
import moment from "moment";
import { Link } from "react-router-dom";
import "moment/locale/ru";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { PostContext } from "../../context/postContext";
import { ModalContext } from "../../context/modalContext";

const PostCard = ({
  post,
  title,
  text,
  image,
  tags,
  author,
  likes,
  created_at,
  _id,
}) => {
  console.log("card");
  const { handlePostLike: onPostLike, setCurrentPost } =
    useContext(PostContext);
  const { user: currentUser } = useContext(UserContext);
  const { handleOpen } = useContext(ModalContext);
  const liked = isLiked(likes, currentUser._id);

  function handleLikeClick(e) {
    e.stopPropagation();
    onPostLike(post);
  }

  function handleDeleteClick(e) {
    e.stopPropagation();
    handleOpen("confirm");
    setCurrentPost(_id);
  }

  return (
    <Card
      sx={{
        maxWidth: 345,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Link to={`/post/${_id}`} className="card__link">
        <CardHeader
          avatar={<Avatar src={author.avatar} aria-label="recipe"></Avatar>}
          title={title}
          subheader={moment(created_at).format("LL")}
        />
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt="Paella dish"
        />
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {text}
          </Typography>
        </CardContent>
      </Link>
      <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
        <IconButton
          aria-label="add to favorites"
          onClick={(e) => handleLikeClick(e)}
        >
          {liked ? <FavoriteIcon /> : <FavoriteBorder />}
          {likes.length}
        </IconButton>
        <IconButton
          aria-label="add to favorites"
          onClick={(e) => handleDeleteClick(e)}
        >
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PostCard;
