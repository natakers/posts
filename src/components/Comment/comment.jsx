import { useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import moment from "moment";
import "moment/locale/ru";
import { useState } from "react";
import api from "../../Api";
import { ModalContext } from "../../context/modalContext";
import { PostContext } from "../../context/postContext";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";

const Comment = ({ comment }) => {
  const [author, setAuthor] = useState(null);
  const { handleOpen } = useContext(ModalContext);
  const { setCurrentComment } = useContext(PostContext);

  const fetchAuthor = async (id) => {
    let result;

    try {
      result = await api.getUser(id);
      setAuthor(result);
    } catch (error) {
      console.log(error);
    }

    if (!result) {
      setAuthor("Не определен");
    }
  };
  if (author == null) {
    fetchAuthor(comment.author);
  }

  const handleDeleteComment = (e) => {
    e.stopPropagation();
    setCurrentComment(comment._id);
    handleOpen("confirm", "comment");
  };

  return (
    <Box
      sx={{
        display: "flex",
        margin: "0.5rem 0",
        border: "1px solid #A0A0A4",
        width: { xs: "100%", md: "50%" },
        padding: "0.5rem",
        borderRadius: "0.5rem",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex" }}>
        {author && (
          <Tooltip title="Open settings">
            <Avatar sx={{ mr: 1 }} alt="avatar" src={author.avatar} />
          </Tooltip>
        )}

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {author && (
            <Tooltip title="Open settings">
              <Typography>{author.name}</Typography>
            </Tooltip>
          )}
          <Typography variant="body2" color="text.secondary">
            {moment(comment.updated_at).format("HH:mm:ss DD.MM.YYYY")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {comment.text}
          </Typography>
        </Box>
      </Box>
      <IconButton
        aria-label="add to favorites"
        onClick={(e) => handleDeleteComment(e)}
      >
        <Delete />
      </IconButton>
    </Box>
  );
};

export default Comment;
