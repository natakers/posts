import Comment from '../Comment/comment';
import NewComment from '../NewComment/newComment';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import 'moment/locale/ru';
import { isLiked } from '../../utils';
import { useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { CommentsState } from 'redux/reducers/comments/commentsSlice';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { getComments } from 'redux/reducers/comments/comments_action_creators';
import Like from 'components/IconsButton/Like';
import DeleteButton from 'components/IconsButton/Delete';
import { UsersState } from 'redux/reducers/user/userSlice';
import { handleOpen } from 'redux/reducers/modal/modalSlice';

export const Post = () => {
  const { comments }: CommentsState = useTypedSelector(state => state.comments)
  const { currentPost } = useTypedSelector(state => state.posts)
  const { currentUser }: UsersState = useTypedSelector(state => state.user)
  let liked = false
  
  if (currentUser && currentPost) liked = isLiked(currentPost.likes, currentUser._id);

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (currentPost && currentPost._id !== '') {
      dispatch(getComments(currentPost._id))
    }
    // eslint-disable-next-line
  }, [currentPost]);

  function handleDeleteClick(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    dispatch(handleOpen({type: 'confirm', secondType: 'post'}));
  }
  const handleEditClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    dispatch(handleOpen({type: 'post_modal', secondType: 'update'}));
  };
  return (
    <>
    <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
      {currentPost && (
        <>
          <Box>
            <CardActions
              disableSpacing
              sx={{ justifyContent: 'space-between' }}
            >
              <Like  post={currentPost} liked={liked}/>
              { currentPost.author._id === currentUser?._id && <Box>
                <IconButton
                  aria-label='add to favorites'
                  onClick={(e) => handleEditClick(e)}
                >
                  <EditIcon />
                </IconButton>
                <DeleteButton callback={(e: React.MouseEvent<HTMLElement>) => handleDeleteClick(e)}/>
              </Box>}
            </CardActions>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex' }}>
              <Typography variant='body2' color='text.secondary' sx={{ mr: 1 }}>
                {currentPost.author.name}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {currentPost.author.about}
              </Typography>
            </Box>
            <Typography variant='body2' color='text.secondary'>
              {moment(currentPost.created_at).format('LL')}
            </Typography>
          </Box>
          <Box>
            tags:
            {currentPost.tags &&
              currentPost.tags.map((tag: string) => (
                <span key={tag} style={{ fontWeight: 300, margin: '0 5px' }}>
                  {tag}
                </span>
              ))}
          </Box>
          <Box style={{ margin: '1rem 0' }}>
            <Typography variant='h5' color='text.secondary'>
              {currentPost.title}
            </Typography>
          </Box>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <CardMedia
              style={{ flexBasis: '30%' }}
              component='img'
              height='250'
              image={currentPost.image}
              alt={currentPost.title}
            />
            <Typography variant='body2' color='text.secondary'>
              {currentPost.text}
            </Typography>
          </Stack>
          <Box sx={{ mt: 2 }}>
            <Typography variant='body2' color='text.secondary'>
              Комментарии
            </Typography>
            <NewComment />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {comments &&
                comments.map((comment) => (
                  <Comment key={comment._id} {...comment} />
                ))}
            </Box>
          </Box>
        </>
      )}
    </Box>
    </>
  );
};