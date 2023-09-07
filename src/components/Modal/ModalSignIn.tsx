import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import styles from "./modals.module.css";
import { useNavigate } from "react-router-dom";
import { UsersState } from "redux/reducers/user/userSlice";
import { useTypedSelector } from "hooks/useTypedSelector";
import { useAppDispatch } from "hooks/useAppDispatch";
import { singInUser } from "redux/reducers/user/user_action_creators";
import { handleClose } from "redux/reducers/modal/modalSlice";

const ModalSignIn = () => {
  const { token }: UsersState = useTypedSelector(state => state.user)
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignIn>({
    mode: "onChange",
  });

  const onSubmit = async (data: UserSignIn) => {
    dispatch(singInUser(data))
    dispatch(handleClose());
    if (token) navigate('/')
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography
        sx={{ mb: 3, color: "#013f4e" }}
        id="modal-modal-title"
        variant="h6"
        component="h2"
      >
        Авторизация
      </Typography>

      <TextField
        sx={{ width: "100%", mb: 2 }}
        size="small"
        placeholder="Email"
        label="Email"
        id="postName"
        variant="outlined"
        {...register("email", {
          required: "Обязательное поле",
          pattern: {
            value:
              /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
            message: "Введите валидный адрес электронной почты.",
          },
        })}
        type="text"
        onChange={register("email").onChange}
      />
      <div className={styles.erroe__form}>
        {errors?.email && <p>{errors?.email?.message}</p>}
      </div>
      <TextField
        sx={{ width: "100%", mb: 2 }}
        placeholder="Пароль"
        size="small"
        label="Пароль"
        id="postText"
        variant="outlined"
        {...register("password", {
          required: "Обязательное поле",
        })}
        type="password"
        onChange={register("password").onChange}
      />
      <div className={styles.erroe__form}>
        {errors?.password && <p>{errors?.password?.message}</p>}
      </div>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#00718f",
            ":hover": { bgcolor: "#58641a", color: "white" },
          }}
        >
          Войти
        </Button>
        <Button
          onClick={() => dispatch(handleClose())}
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
  );
};
export default ModalSignIn;

export interface UserSignIn {
  password: string;
  email: string;
}
