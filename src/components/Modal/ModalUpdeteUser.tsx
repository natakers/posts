import { useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import CardMedia from "@mui/material/CardMedia";
import { ModalContext } from "../../context/modalContext";
import { UserContext } from "../../context/userContext";
import { useForm } from "react-hook-form";
import {  UserUpdateProps } from "types/contexTypes";

const ModalUpdateUser = () => {
  const { handleClose } = useContext(ModalContext);
  const { user: currentUser, handleUpdateUser, handleUpdateAvatar } = useContext(UserContext);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<InputTypes>({ mode: "onBlur" });
  const onSubmit = (data: UserUpdateProps) => { handleUpdateUser(data); if (data.avatar) {handleUpdateAvatar(data.avatar)}; handleClose(); };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography sx={{ mb: 3, color: "#013f4e" }} id="modal-modal-title" variant="h6" component="h2">
          Изменить пользователя
        </Typography>
        <Box sx={{ mt: 1, mb: 1, display: "flex", alignItems: "center",}}>
          <Box sx={{ display: "flex", flexBasis: "100%", alignItems: "center", }}>
            <CardMedia component="img" width="100%" height="auto" image={ watch('avatar') || (currentUser ? currentUser.avatar : '') } alt="Paella dish" />
          </Box>
          <Box sx={{ ml: 1 }}>
            <TextField label="Имя" id="userName" variant="outlined" size="small" sx={{ backgroundColor: "white", m: "0.5rem 0" }} {...register("name")}
              type="text" defaultValue={currentUser ? currentUser.name : ''} value={watch("name")} onChange={register("name").onChange} />
              <div className="erroe__form">
                {errors?.name && <p>{errors?.name?.message}</p>}
              </div>
            <TextField label="Роль" id="userAbout" variant="outlined" size="small" defaultValue={currentUser ? currentUser.about : ''} value={watch("about")} 
            {...register("about")} type="text" onChange={register("about").onChange} sx={{ backgroundColor: "white", m: "0.5rem 0" }} />
              <div className="erroe__form">
                {errors?.about && <p>{errors?.about?.message}</p>}
              </div>
            <TextField label="URL аватара" id="userImage" variant="outlined" size="small" sx={{ backgroundColor: "white", m: "0.5rem 0" }} defaultValue={currentUser ? currentUser.avatar : ''}
              {...register("avatar")} type="text" value={watch("avatar")} onChange={register("avatar").onChange} />
              <div className="erroe__form">
                {errors?.avatar && <p>{errors?.avatar?.message}</p>}
              </div>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" type="submit" sx={{ backgroundColor: "#00718f", ":hover": { bgcolor: "#58641a", color: "white" }, }}>
            Сохранить
          </Button>
          <Button onClick={handleClose} variant="contained" sx={{ backgroundColor: "#f0e2d5", color: "#013f4e", ":hover": { bgcolor: "#58641a", color: "white" }, }}>
            Отмена
          </Button>
        </Box>
      </form>
    </>
  );
};
export default ModalUpdateUser;

interface InputTypes {
  name: string;
  avatar: string;
  about: string
}
