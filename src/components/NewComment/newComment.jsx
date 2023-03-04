import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import "moment/locale/ru";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { PostContext } from "../../context/postContext";
import { useState } from "react";
import api from "../../Api";

const NewComment = ({setCommentsLocal, }) => {
  const { user: currentUser } = useContext(UserContext);
  const { currentPost } = useContext(PostContext);
  const [comment, setComment] = useState('');

  const handleClickAdd = async () => {
    try {
      let result = await api.postComment(currentPost, comment);
      setCommentsLocal(result.comments.reverse())
      setComment('')
    } catch (error) {
      alert(error);
    }
    
  }
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
      <Tooltip title="Open settings">
        <Avatar alt="avatar" src={currentUser.avatar} />
      </Tooltip>
      <TextField
        sx={{ mb: 2 }}
        placeholder="Текст поста"
        multiline
        maxRows={4}
        value={comment}
        onInput={(e) => {
          setComment(e.target.value);
        }}
      />
      <Button
        onClick={handleClickAdd}
        variant="contained"
        sx={{
          backgroundColor: "#00718f",
          ":hover": { bgcolor: "#58641a", color: "white" },
        }}
      >
        ✓
      </Button>
      <Button
        // onClick={handleClickButtonEdit}
        variant="contained"
        sx={{
          backgroundColor: "#f0e2d5",
          color: "#013f4e",
          ":hover": { bgcolor: "#58641a", color: "white" },
        }}
      >
        x
      </Button>
    </Box>
  );
};

export default NewComment;
