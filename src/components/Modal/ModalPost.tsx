import { useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { ModalContext } from "../../context/modalContext";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "hooks/useAppDispatch";
import { getPosts, postPost, updatePost } from "redux/reducers/posts/post_action_creators";
import { useTypedSelector } from "hooks/useTypedSelector";
import { PostsState } from "redux/reducers/posts/postsSlice";


export interface PostPostProps {
  tags: string | string[];
  title: string;
  text: string;
  image: string;
}

const ModalPost = () => {
  const { handleClose, secondType } = useContext(ModalContext);
  const { currentPost }: PostsState = useTypedSelector(state => state.posts)
  const { register, handleSubmit, formState: { errors },} = useForm<PostPostProps>({ mode: "onChange", });
  const dispatch = useAppDispatch()

  const onSubmit = async (data: PostPostProps) => {
    data = { ...data, tags: (typeof data.tags == 'string') ? data.tags.split(" ") : data.tags };
    if (secondType === "create") { dispatch(postPost(data)) }
    if (secondType === "update" && currentPost) { dispatch(updatePost({id: currentPost._id, data: data})) }
    dispatch(getPosts())
    handleClose();
  };

  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography sx={{ mb: 3, color: "#013f4e" }} id="modal-modal-title" variant="h6" component="h2">
        {secondType === 'create' && "Создать пост"} {secondType === 'update' && "Редактирование поста"}
      </Typography>
      <TextField sx={{ width: "100%" }} size="small" placeholder="Название поста" label="Название поста" id="postName" variant="outlined"
        defaultValue={(currentPost && secondType === "update") ? currentPost.title : ''}
        { ...register("title", { required: "Обязательное поле", minLength: { value: 2, message: "Минимальная длина - 2 символа", },})}
        type="text"
        onChange={register("title").onChange}
      />
      <div className="erroe__form">
        {errors?.title && <p>{errors?.title?.message}</p>}
      </div>
      <TextField sx={{ width: "100%", mt: 2 }} placeholder="Текст поста" multiline rows={2} maxRows={4} label="Текст поста" id="postText" variant="outlined"
        defaultValue={(currentPost && secondType === "update") ? currentPost.text : ''}
        {...register("text", { required: "Обязательное поле", })} type="text" onChange={register("text").onChange}/>
      <div className="erroe__form">
        {errors?.text && <p>{errors?.text?.message}</p>}
      </div>
      <TextField
        sx={{ width: "100%", mt: 2 }} placeholder="Адрес картинки" size="small" label="Адрес картинки" id="postText" variant="outlined"
        defaultValue={(currentPost && secondType === "update") ? currentPost.image : ''}
        {...register("image", { required: "Обязательное поле", pattern: { value: /(^https?:\/\/)?[a-z0-9~_\-.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i,
            message: "Поле должно быть валидным url-адресом",},})}
        type="text" onChange={register("image").onChange}
      />
      <div className="erroe__form">
        {errors?.image && <p>{errors?.image?.message}</p>}
      </div>
      <TextField sx={{ mt: 3, width: "100%" }} placeholder="Напишите тэги через пробел" size="small" label="Напишите тэги через пробел" id="postText"
        variant="outlined" defaultValue={(currentPost && secondType === "update") ? currentPost.tags.join(' ') : ''}
        {...register("tags", { required: "Обязательное поле",
        })} type="text" onChange={register("tags").onChange} />
      <div className="erroe__form">
        {errors?.tags && <p>{errors?.tags?.message}</p>}
      </div>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button type="submit" variant="contained" sx={{ backgroundColor: "#00718f", ":hover": { bgcolor: "#58641a", color: "white" }, }}>
          Сохранить
        </Button>
        <Button onClick={handleClose} variant="contained" sx={{ backgroundColor: "#f0e2d5", color: "#013f4e", ":hover": { bgcolor: "#58641a", color: "white" }, }} >
          Отмена
        </Button>
      </Box>
    </form>
  );
};
export default ModalPost;
