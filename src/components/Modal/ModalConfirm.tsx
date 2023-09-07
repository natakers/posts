import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "hooks/useAppDispatch";
import { UsersState, exitUser } from "redux/reducers/user/userSlice";
import { useTypedSelector } from "hooks/useTypedSelector";
import { PostsState } from "redux/reducers/posts/postsSlice";
import { CommentsState } from "redux/reducers/comments/commentsSlice";
import { deleteComment } from "redux/reducers/comments/comments_action_creators";
import { ModalState, handleClose } from "redux/reducers/modal/modalSlice";
import { deletePost } from "redux/reducers/posts/post_action_creators";


const ModalConfirm = () => {
  const navigate = useNavigate();
  const { currentUser }: UsersState = useTypedSelector(state => state.user)
  const { currentPost }: PostsState = useTypedSelector(state => state.posts)
  const { currentComment }: CommentsState = useTypedSelector(state => state.comments)
  const { secondType }: ModalState = useTypedSelector(state => state.modal)
  const dispatch = useAppDispatch()
  let location = useLocation();

  const handleDeleteUser = () => {
    if (currentUser) {dispatch(exitUser())
    navigate('/login')}
  };

  const handlePostDelete = async () => {
    if (currentPost) dispatch(deletePost(currentPost?._id))
  };

  const handleCommentDelete = () => {
    if (currentPost && currentComment) dispatch(deleteComment({postID: currentPost._id, commentID: currentComment._id}))
  };

  function handleDel(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    if (secondType === 'post' ) { handlePostDelete(); dispatch(handleClose());
    if (currentPost && currentPost._id === location.pathname.split("/").reverse()[0]) { navigate(-1);}}
    if (secondType === 'comment' ) { handleCommentDelete(); dispatch(handleClose());}
    if (secondType === 'user' ) { handleDeleteUser(); dispatch(handleClose());}}
  return (
    <>
      <Typography sx={{ mb: 3, color: "#013f4e" }} id="modal-modal-title" variant="h6" component="h2">
        {`${secondType === 'post' ? 'Уверены что хотите удалить пост' : secondType === 'comment' ? 
        "Уверены что хотите удалить комментарий" : secondType === 'user' ? 'Уверены что хотите выйти' : "ОШИБКА"}?`}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={(e) => handleDel(e)} variant="contained" sx={{ backgroundColor: "#00718f", ":hover": { bgcolor: "#58641a", color: "white" },}}>
          Да
        </Button>
        <Button onClick={() => dispatch(handleClose())} variant="contained" sx={{ backgroundColor: "#f0e2d5", color: "#013f4e", ":hover": { bgcolor: "#58641a", color: "white" }, }} >
          Нет
        </Button>
      </Box>
    </>
  );
};
export default ModalConfirm;
