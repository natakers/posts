import { isLiked } from "../../utils";
import "./index.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { Link } from "react-router-dom";
import "moment/locale/ru";
import { MouseEvent, useContext } from "react";
import { PostProps } from "types/contexTypes";
import { UsersState } from "redux/reducers/user/userSlice";
import { useTypedSelector } from "hooks/useTypedSelector";
import Like from "components/IconsButton/Like";
import DeleteButton from "components/IconsButton/Delete";
import { ModalContext } from 'context/modalContext';
import { setCurrentPost } from "redux/reducers/posts/postsSlice";
import { useAppDispatch } from "hooks/useAppDispatch";

const PostCard: React.FC<PostProps> = (post) => {
  const { currentUser }: UsersState = useTypedSelector(state => state.user)
  const dispatch = useAppDispatch()
  let liked = isLiked(post.likes, currentUser ? currentUser._id : '');
  const { handleOpen } = useContext(ModalContext);
  function handleDeleteClick(e: MouseEvent) {
    dispatch(setCurrentPost(post))
    e.stopPropagation();
    handleOpen("confirm", 'post');
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
        <Like liked={liked} post={post} length={post.likes.length}/>
        {post.author._id === currentUser?._id &&<DeleteButton callback={(e: React.MouseEvent<HTMLElement>) => handleDeleteClick(e)}/>}
      </CardActions>
    </Card>
  );
};

export default PostCard;

