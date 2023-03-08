import { useCallback, useContext, useEffect, useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import CardMedia from "@mui/material/CardMedia";
import { ModalContext } from "../../context/modalContext";
import { UserContext } from "../../context/userContext";
import { useForm } from "react-hook-form";

const ModalUpdateUser = () => {
  const { handleClose } = useContext(ModalContext);
  const { user: currentUser, handleUpdateUser } = useContext(UserContext);
  const [avatarUser, setAvatar] = useState(currentUser.avatar);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    handleUpdateUser(data);
    handleClose();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography
          sx={{ mb: 3, color: "#013f4e" }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Изменить пользователя
        </Typography>
        <Box
          sx={{
            mt: 1,
            mb: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexBasis: "100%",
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              width="100%"
              height="auto"
              // src={register("about").value}
              image={ watch('avatar') || currentUser.avatar }
              alt="Paella dish"
            />
          </Box>
          <Box sx={{ ml: 1 }}>
            <TextField
              label="Имя"
              id="userName"
              variant="outlined"
              size="small"
              sx={{ backgroundColor: "white", m: "0.5rem 0" }}
              {...register("name")}
              type="text"
              defaultValue={currentUser.name}
              value={register("name").value}
              onChange={register("name").onChange}
            />
            <TextField
              label="Роль"
              id="userAbout"
              variant="outlined"
              size="small"
              defaultValue={currentUser.about}
              value={register("about").value}
              onChange={register("about").onChange}
              sx={{ backgroundColor: "white", m: "0.5rem 0" }}
              {...register("about")}
              type="text"
            />
            <TextField
              label="URL аватара"
              id="userImage"
              variant="outlined"
              size="small"
              sx={{ backgroundColor: "white", m: "0.5rem 0" }}
              defaultValue={avatarUser}
              value={register("avatar").value}
              onChange={register("avatar").onChange}
              {...register("avatar")}
              type="text"
            />
          </Box>
          <div /*className={styles.errorMessage}*/>
            {errors?.password && <p>{errors?.password?.message}</p>}
          </div>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: "#00718f",
              ":hover": { bgcolor: "#58641a", color: "white" },
            }}
          >
            Сохранить
          </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{
              backgroundColor: "#f0e2d5",
              color: "#013f4e",
              ":hover": { bgcolor: "#58641a", color: "white" },
            }}
          >
            Отмена
          </Button>
        </Box>
      </form>
    </>
  );
};
export default ModalUpdateUser;
