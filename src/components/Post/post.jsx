
import Comment from "../Comment/comment";
import NewComment from "../NewComment/newComment";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Delete from "@mui/icons-material/Delete";
import moment from "moment";
import "moment/locale/ru";
import { isLiked } from "../../utils";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { PostContext } from "../../context/postContext";
import { ModalContext } from "../../context/modalContext";

export const Post = ({
  post,
  title,
  text,
  image,
  tags,
  author,
  likes,
  created_at,
  comments,
  _id,
}) => {
  const { user: currentUser } = useContext(UserContext);
  const { handlePostLike: onPostLike, setCurrentPost } =
    useContext(PostContext);
  const { handleOpen } = useContext(ModalContext);
  const liked = isLiked(likes, currentUser?._id);
  const [like, setLike] = useState(liked);
  const [commentsLocal, setCommentsLocal] = useState(comments.reverse());

  function handleLikeClick(e) {
    e.stopPropagation();
    onPostLike(post);
    setLike(!like);
  }
  function handleDeleteClick(e) {
    e.stopPropagation()
    handleOpen('confirm')
  }
  useEffect(() =>{
    setCurrentPost(_id)
  })
  
  console.log("post");

  return (
    <Box sx={{ display: "flex", flexGrow: 1, flexDirection: "column" }}>
      <Box>
        <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
          <IconButton
            aria-label="add to favorites" onClick={(e) => handleLikeClick(e)}
          >
            {like ? <FavoriteIcon /> : <FavoriteBorder />}
          </IconButton>
          <IconButton
            aria-label="add to favorites"
            onClick={(e) => handleDeleteClick(e)}
          >
            <Delete />
          </IconButton>
        </CardActions>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex" }}>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
            {author.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {author.about}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {moment(created_at).format("LL")}
        </Typography>
      </Box>
      <Box>
        tags:
        {tags &&
          tags.map((tag) => (
            <span
              key={tag}
              style={{fontWeight: 300, margin: "0 5px"}}
            >
              {tag}
            </span>
          ))}
      </Box>
      <Box style={{margin: "1rem 0"}}>
      <Typography variant="h5" color="text.secondary" >
          {title}
        </Typography>
      </Box>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <CardMedia component="img" height="250" image={image} alt={title} />
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </Stack>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Комментарии
        </Typography>
        <NewComment setCommentsLocal={setCommentsLocal} />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {commentsLocal &&
            commentsLocal.map((comment) => (
              <Comment key={comment._id} comment={comment}/>
            ))}
        </Box>
      </Box>
    </Box>
  );
};
