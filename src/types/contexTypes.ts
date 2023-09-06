export interface UserProps {
    name: string,
    email: string,
    avatar: string,
    about: string,
    group: string,
    _id: string,

}

export interface UserUpdateProps {
    name: string,
    avatar?: string,
    about: string,
    email?: string
}

export interface PostProps {
    author: UserProps,
    comments: CommentProps[],
    title: string,
    text: string,
    image: string,
    _id: string,
    created_at: string,
    updated_at: string,
    likes: string[],
    tags: string[]

}

export interface CommentProps {
    author: UserProps,
    created_at: string,
    post: string,
    text: string,
    updated_at: string,
    _id: string
}

export interface ModalContexProps {
    open: boolean, 
    type: string, 
    setOpen: (open: boolean) => void,
    handleOpen: (type: string, secondType?: string) => void, 
    secondType: string, 
    setType: (type: string) => void, 
    handleClose: () => void
}

export interface PostContexProps {
    handlePostLike: (post: PostProps) => void,
    handlePostDelete: () => void,
    currentPost: PostProps | null,
    setCurrentPost: (post: PostProps) => void,
    handleCommentDelete: () => void,
    currentComment: string,
    setCurrentComment: (id: string) => void,
    currentCommentList: CommentProps[],
    setCurrentCommentList: (comments: CommentProps[]) => void,
}