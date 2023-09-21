import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import "moment/locale/ru";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SaveIcon from '@mui/icons-material/Save';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { UsersState } from "redux/reducers/user/userSlice";
import { useTypedSelector } from "hooks/useTypedSelector";
import { PostsState } from "redux/reducers/posts/postsSlice";
import { postComment } from "redux/reducers/comments/comments_action_creators";
import { useAppDispatch } from "hooks/useAppDispatch";
import { toast } from "react-toastify";


const NewComment = () => {
  const { currentUser }: UsersState = useTypedSelector(state => state.user)
  const { currentPost }: PostsState = useTypedSelector(state => state.posts)
  const dispatch = useAppDispatch()
  const [comment, setComment] = useState<string>('');
  const style = {
    backgroundColor: "#fff",
    color: "rgba(0, 0, 0, 0.87)",
    borderRadius: "4px",
    boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    display: "flex", 
    alignItems: "flex-start",
    width: { xs: "100%", md: "50%" },
    padding: "0.5rem"
  } 

  const handleClickAdd = async () => {
    try {
      if (currentPost) {
        const resultAction = await dispatch(postComment({id: currentPost._id, text: comment}))
        if (postComment.fulfilled.match(resultAction)) {
          setComment('')
        } else {
          toast.error((resultAction.payload as String), {position: toast.POSITION.TOP_CENTER})
        }
      }
    } catch (error) { alert(error); }
  }
  const handleClickClean = () => {setComment('')}
  return (
    <Box sx={ style }>
      <Tooltip title="Open settings">
        <Avatar alt="avatar" src={currentUser ? currentUser.avatar : ''} />
      </Tooltip>
      <TextField sx={{ m: "0.5rem" }} placeholder="Текст комментария" multiline maxRows={4} value={comment}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
          setComment(e.target.value);
        }}
      />
      <IconButton aria-label="" onClick={handleClickAdd}>
        <SaveIcon />
      </IconButton>
      <IconButton aria-label="" onClick={handleClickClean}>
        <HighlightOffIcon />
      </IconButton>
    </Box>
  );
};

export default NewComment;
