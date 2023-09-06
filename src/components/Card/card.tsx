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
import { MouseEvent, useContext } from "react";
import { PostContext } from "../../context/postContext";
import { ModalContext } from "../../context/modalContext";
import { PostProps } from "types/contexTypes";
import { UsersState } from "redux/reducers/user/userSlice";
import { useTypedSelector } from "hooks/useTypedSelector";

const PostCard: React.FC<PostProps> = (post) => {
  const { handlePostLike: onPostLike, setCurrentPost } = useContext(PostContext);
  const { currentUser }: UsersState = useTypedSelector(state => state.user)
  const { handleOpen } = useContext(ModalContext);
  const liked = isLiked(post.likes, currentUser ? currentUser._id : '');
  
  function handleLikeClick(e: MouseEvent) {
    e.stopPropagation();
    onPostLike(post);
  }
  function handleDeleteClick(e: MouseEvent) {
    e.stopPropagation();
    handleOpen("confirm", 'post');
    setCurrentPost(post);
  }
  return (
    <Card sx={{ maxWidth: 345, display: "flex", flexDirection: "column", justifyContent: "space-between", }}>
      <Link to={`/post/${post._id}`} className="card__link">
        <CardHeader avatar={<Avatar src={post.author.avatar} aria-label="recipe"></Avatar>} title={post.title} subheader={moment(post.created_at).format("LL")}/>
        <CardMedia component="img" height="194" image={post.image} alt={post.title}/>
        <CardContent>
          <Typography variant="body2" color="text.secondary" sx={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", }}>
            {post.text}
          </Typography>
        </CardContent>
      </Link>
      <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
        <IconButton aria-label="add to favorites" onClick={(e) => handleLikeClick(e)}>
          {liked ? <FavoriteIcon /> : <FavoriteBorder />}
          {post.likes.length}
        </IconButton>
        <IconButton aria-label="add to favorites" onClick={(e) => handleDeleteClick(e)}>
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PostCard;

