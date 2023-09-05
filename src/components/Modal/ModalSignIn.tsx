import { useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { ModalContext } from "../../context/modalContext";
import { useForm } from "react-hook-form";
import api from "../../Api";
import { UserContext } from "../../context/userContext";
import styles from "./modals.module.css";
import { useNavigate } from "react-router-dom";

const ModalSignIn = () => {
  const { handleClose } = useContext(ModalContext);
  const { setToken } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputTypes>({
    mode: "onChange",
  });
  const navigate = useNavigate();

  const onSubmit = async (data: InputTypes) => {
    try {
      let result = await api.singInUser(data);
      console.log(result);
      localStorage.setItem("tokenPosts", result.token);
      setToken(result.token);
      navigate("/");
    } catch (error) {
      alert(error);
    }
    handleClose();
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
        value={watch("email")}
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
        value={watch("password")}
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
  );
};
export default ModalSignIn;

interface InputTypes {
  password: string;
  email: string;
}
