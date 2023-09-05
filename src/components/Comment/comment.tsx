import { useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import moment from "moment";
import "moment/locale/ru";
import { ModalContext } from "../../context/modalContext";
import { PostContext } from "../../context/postContext";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import { CommentProps } from "types/contexTypes";

const Comment: React.FC<CommentProps> = ( comment) => {
  const { handleOpen } = useContext(ModalContext);
  const { setCurrentComment } = useContext(PostContext);

  const handleDeleteComment = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setCurrentComment(comment._id);
    handleOpen("confirm", "comment");
  };

  return (
    <Box
      sx={{ display: "flex", margin: "0.5rem 0", border: "1px solid #A0A0A4", width: { xs: "100%", md: "50%" }, 
      padding: "0.5rem", borderRadius: "0.5rem", justifyContent: "space-between",}}>
      <Box sx={{ display: "flex" }}>
        {comment.author && ( <Avatar sx={{ mr: 1 }} alt="avatar" src={comment.author.avatar} />  )}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {comment.author && ( <Typography>{comment.author.name}</Typography> )}
          <Typography variant="body2" color="text.secondary"> {moment(comment.updated_at).format("HH:mm:ss DD.MM.YYYY")} </Typography>
          <Typography variant="body2" color="text.secondary"> {comment.text} </Typography>
        </Box>
      </Box>
      <IconButton aria-label="add to favorites" onClick={(e) => handleDeleteComment(e)}>
        <Delete />
      </IconButton>
    </Box>
  );
};

export default Comment;
