import { isLiked } from "../../utils";
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
import moment from "moment";
import "moment/locale/ru";
import ModalConfirm from "../Modal/ModalConfirm";

const PostCard = ({
  post,
  onPostLike,
  onPostDelete,
  currentUser,
  title,
  text,
  image,
  tags,
  author,
  likes,
  created_at,
  _id,
}) => {
  const liked = isLiked(likes, currentUser._id);

  function handleLikeClick(e) {
    e.stopPropagation();
    onPostLike(post);
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={<Avatar src={author.avatar} aria-label="recipe"></Avatar>}
        title={title}
        subheader={moment(created_at).format("LL")}
      />
      <CardMedia component="img" height="194" image={image} alt="Paella dish" />
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
      <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
        <IconButton
          aria-label="add to favorites"
          onClick={(e) => handleLikeClick(e)}
        >
          {liked ? <FavoriteIcon /> : <FavoriteBorder />}
          <span>{likes.length}</span>
        </IconButton>
        <ModalConfirm post={post} onPostDelete={onPostDelete} />
      </CardActions>
    </Card>
  );
};

export default PostCard;
