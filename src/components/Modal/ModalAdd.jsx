import { useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { ModalContext } from "../../context/modalContext";
import { useForm } from "react-hook-form";

const ModalAdd = () => {
  const { handleClose } = useContext(ModalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
    // handleUpdateUser(data);
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
          Создать пост
        </Typography>
        <TextField
          sx={{ width: "100%", mb: 2 }}
          size="small"
          placeholder="Название поста"
          label="Название поста"
          id="postName"
          variant="outlined"
          {...register("title")}
          type="text"
          value={register("title").value}
          onChange={register("title").onChange}
        />
        <TextField
          sx={{ width: "100%", mb: 2 }}
          placeholder="Текст поста"
          multiline
          rows={2}
          maxRows={4}
          label="Текст поста"
          id="postText"
          variant="outlined"
          {...register("text")}
          type="text"
          value={register("text").value}
          onChange={register("text").onChange}
        />
        <TextField
          sx={{ width: "100%", mb: 2 }}
          placeholder="Адрес картинки"
          size="small"
          label="Адрес картинки"
          id="postText"
          variant="outlined"
          {...register("image")}
          type="text"
          value={register("image").value}
          onChange={register("image").onChange}
        />
        <TextField
          sx={{ mb: 3, width: "100%" }}
          placeholder="Напишите тэги через пробел"
          size="small"
          label="Напишите тэги через пробел"
          id="postText"
          variant="outlined"
          {...register("tags")}
          type="text"
          value={register("tags").value}
          onChange={register("tags").onChange}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            type="submit"
            variant="contained"
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

  );
};
export default ModalAdd;
