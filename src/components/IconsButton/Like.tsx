import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { PostProps } from "types/contexTypes";
import { changeLikePostStatus } from "redux/reducers/posts/post_action_creators";
import { useAppDispatch } from "hooks/useAppDispatch";

const Like = ({ liked, post, length }: LikeProps) => {
  const dispatch = useAppDispatch();
  const handleLikeClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    liked = !liked;
    dispatch(changeLikePostStatus({ postID: post._id, like: liked }));
  };
  return (
    <IconButton
      aria-label="add to favorites"
      onClick={(e) => handleLikeClick(e)}
    >
      {liked ? <FavoriteIcon /> : <FavoriteBorder />}
      {length}
    </IconButton>
  );
};

export default Like;

export interface LikeProps {
  liked: boolean;
  post: PostProps;
  length?: number;
}
