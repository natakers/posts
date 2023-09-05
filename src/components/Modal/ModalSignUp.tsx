import { useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { ModalContext } from "../../context/modalContext";
import { useForm } from "react-hook-form";
import api from "../../Api";
import styles from "./modals.module.css";

interface InputTypes {
  password: string;
  email: string;
  group: string
}

const ModalSignUp = () => {
  const { handleClose, handleOpen } = useContext(ModalContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputTypes>({
    mode: "onChange",
  });

  const onSubmit = async (data: InputTypes) => {
    console.log(data);
    try {
      let result = await api.singUpUser(data);
      console.log(result);
      handleOpen("signIn");
    } catch (error) {
      alert(error);
      handleClose();
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography sx={{ mb: 3, color: "#013f4e" }} id="modal-modal-title" variant="h6" component="h2">
        Регистрация
      </Typography>
      <TextField sx={{ width: "100%", mb: 2 }} size="small" placeholder="Email" label="Email" id="postName" variant="outlined"
        {...register("email", {
          required: "Обязательное поле",
          pattern: {
            value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
            message: "Введите валидный адрес электронной почты.",
          },
        })}
        type="text"  value={watch("email")} onChange={register("email").onChange}
      />
      <div className={styles.erroe__form}>
        {errors?.email && <p>{errors?.email?.message}</p>}
      </div>
      <TextField sx={{ width: "100%", mb: 2 }} placeholder="Группа" label="Группа" id="postText" variant="outlined" {...register("group", {
          required: "Обязательное поле",
        })}
        type="text" value={watch("group")} onChange={register("group").onChange}
      />
      <div className={styles.erroe__form}>
        {errors?.group && <p>{errors?.group?.message}</p>}
      </div>
      <TextField sx={{ width: "100%", mb: 2 }} placeholder="Пароль" size="small" label="Пароль" id="postText" variant="outlined"
        {...register("password", {
          required: "Обязательное поле",
        })}
        type="password" value={watch("password")} onChange={register("password").onChange}
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
          Зарегистрироваться
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
export default ModalSignUp;
