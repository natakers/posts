import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import moment from "moment";
import "moment/locale/ru";
import { useState } from "react";
import api from "../../Api";

const Comment = ({ comment }) => {
  const [author, setAuthor] = useState(null);

  const fetchAuthor = async (id) => {
    let result;

    try {
      result = await api.getUser(id);
      setAuthor(result);
    } catch (error) {
      console.log(error.response.status);
    }

    if (!result) {
      setAuthor("Не определен");
    }
  };
  if (author == null) {
    fetchAuthor(comment.author);
  }

  return (
    <Box sx={{ display: "flex" }}>
      {author && (
        <Tooltip title="Open settings">
          <Avatar sx={{ mr: 1 }} alt="avatar" src={author.avatar} />
        </Tooltip>
      )}

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="body2" color="text.secondary">
          {moment(comment.updated_at).format("LL")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {comment.text}
        </Typography>
      </Box>
    </Box>
  );
};

export default Comment;
