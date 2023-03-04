import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Spinner from "../../components/Spinner/index";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { Post } from "../../components/Post/post";
import { useApi } from "../../hooks/useApi";
import api from "../../Api";


const PostPage = () => {
  console.log("postpage");
  const navigate = useNavigate();
  const { postId } = useParams();

  const handleGetPost = useCallback(() => api.getPostById(postId), [postId]);

  const {
    data: post,
  } = useApi(handleGetPost);

  console.log(post);
  return (
      <Box sx={{ display: "flex", flexGrow: 1, flexDirection: "column" }}>
        <div>
          <Button
            onClick={() => navigate(-1)}
            variant="contained"
            sx={{
              backgroundColor: "#00718f",
              ":hover": { bgcolor: "#58641a", color: "white" },
            }}
          >
            Назад
          </Button>
        </div>
        {post ? <Post post={post} {...post} /> : <Spinner />}
      </Box>
  );
};

export default PostPage;
