import React, { useEffect } from "react";
import { useNavigate, useParams  } from "react-router-dom";
import Box from "@mui/material/Box";
import Spinner from "../../components/Spinner/index";
import Button from "@mui/material/Button";

import api from "../../Api";
import { Post } from "components/Post/post";
import { useAppDispatch } from "hooks/useAppDispatch";
import { getPostById } from "redux/reducers/posts/post_action_creators";
import { useTypedSelector } from "hooks/useTypedSelector";
import { PostsState } from "redux/reducers/posts/postsSlice";


const PostPage = ({token}: {token: string}) => {
  const navigate = useNavigate();
  const { postId } = useParams<string>();
  const dispatch = useAppDispatch()
  const { currentPost }: PostsState = useTypedSelector(state => state.posts)
  useEffect(() => {
    if (token) {
      api._token = `Bearer ${token}`;
      dispatch(getPostById(postId ? postId : ''))
    }
    // eslint-disable-next-line
  }, [token]);

  return (
      <Box sx={{ display: "flex", flexGrow: 1, flexDirection: "column" }}>
        <div>
          <Button onClick={() => navigate(-1)} variant="contained" sx={{ backgroundColor: "#00718f", ":hover": { bgcolor: "#58641a", color: "white" },}}>
            Назад
          </Button>
        </div>
        {currentPost ? <Post/> : <Spinner />}
      </Box>
  );
};

export default PostPage;
