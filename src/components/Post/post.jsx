
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
import EditIcon from '@mui/icons-material/Edit';

export const Post = ({
  post,
  likes,
}) => {
  const { user: currentUser } = useContext(UserContext);
  const { handlePostLike: onPostLike, setCurrentPost, currentPost, currentCommentList, setCurrentCommentList } =
    useContext(PostContext);
  const { handleOpen } = useContext(ModalContext);
  const liked = isLiked(likes, currentUser?._id);
  const [like, setLike] = useState(liked);

  useEffect(() =>{
    setCurrentPost(post)
  }, [post, setCurrentPost])

  useEffect(() =>{
    if (currentPost) {
      setCurrentCommentList(currentPost.comments.reverse())
    }
    
  }, [setCurrentCommentList, currentPost])
  
  function handleLikeClick(e) {
    e.stopPropagation();
    onPostLike(currentPost);
    setLike(!like);
  }
  function handleDeleteClick(e) {
    e.stopPropagation()
    handleOpen('confirm', "post")
  }

  const handleEditClick = (e) => {
    e.stopPropagation()
    handleOpen('post_modal', "update")
  }
  
  console.log("post");

  return (
    
    <Box sx={{ display: "flex", flexGrow: 1, flexDirection: "column" }}>
      {currentPost && 
      <>
      <Box>
      <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
        <IconButton
          aria-label="add to favorites" onClick={(e) => handleLikeClick(e)}
        >
          {like ? <FavoriteIcon /> : <FavoriteBorder />}
        </IconButton>
        <Box>
        <IconButton
          aria-label="add to favorites"
          onClick={(e) => handleEditClick(e)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="add to favorites"
          onClick={(e) => handleDeleteClick(e)}
        >
          <Delete />
        </IconButton>
        </Box>
        
      </CardActions>
    </Box>
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box sx={{ display: "flex" }}>
        <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
          {currentPost.author.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {currentPost.author.about}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary">
        {moment(currentPost.created_at).format("LL")}
      </Typography>
    </Box>
    <Box>
      tags:
      {currentPost.tags &&
        currentPost.tags.map((tag) => (
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
        {currentPost.title}
      </Typography>
    </Box>
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
      <CardMedia style={{flexBasis: "30%"}} component="img" height="250" image={currentPost.image} alt={currentPost.title} />
      <Typography variant="body2" color="text.secondary">
        {currentPost.text}
      </Typography>
    </Stack>
    <Box sx={{ mt: 2 }}>
      <Typography variant="body2" color="text.secondary">
        Комментарии
      </Typography>
      <NewComment />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {currentCommentList &&
          currentCommentList.map((comment) => (
            <Comment key={comment._id} comment={comment}/>
          ))}
      </Box>
    </Box>
    </>
    }
    </Box>
  );
};
