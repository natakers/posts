import { createContext } from 'react';
import { initialUser } from './userContext';
import type { CommentProps, PostContexProps, PostProps } from 'types/contexTypes';

export const initialComment = {
  author: initialUser,
  created_at: '',
  post: '',
  text: '',
  updated_at: '',
};

export const initialPost = {
  author: initialUser,
  comments: [],
  title: '',
  text: '',
  image: '',
  _id: '',
  created_at: '',
  updated_at: '',
  likes: [],
  tags: []
};

const initialState = {
  handlePostLike: (post: PostProps) => {},
  handlePostDelete: () => {},
  currentPost: initialPost,
  setCurrentPost: (post: PostProps) => {},
  handleCommentDelete: () => {},
  currentComment: '',
  setCurrentComment: (id: string) => {},
  currentCommentList: [],
  setCurrentCommentList: (comments: CommentProps[]) => {},
};

export const PostContext = createContext<PostContexProps>(initialState);
PostContext.displayName = ' PostContext';
