import React, { useCallback, useEffect } from "react";
import { useNavigate, useParams  } from "react-router-dom";
import Box from "@mui/material/Box";
import Spinner from "../../components/Spinner/index";
import Button from "@mui/material/Button";

import api from "../../Api";
import { useApi } from "hooks/useApi";
import { Post } from "components/Post/post";


const PostPage = ({token}: {token: string}) => {
  const navigate = useNavigate();
  const { postId } = useParams();
  useEffect(() => {
    if (token) {
      api._token = `Bearer ${token}`;
    }
  }, [token]);

  const handleGetPost = useCallback(() => api.getPostById(postId), [postId]);
  const { data: post } = useApi(handleGetPost);
  

  return (
      <Box sx={{ display: "flex", flexGrow: 1, flexDirection: "column" }}>
        <div>
          <Button onClick={() => navigate(-1)} variant="contained" sx={{ backgroundColor: "#00718f", ":hover": { bgcolor: "#58641a", color: "white" },}}>
            Назад
          </Button>
        </div>
        {post ? <Post {...post} /> : <Spinner />}
      </Box>
  );
};

export default PostPage;
