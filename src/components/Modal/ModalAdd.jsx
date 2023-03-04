import { useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { ModalContext } from "../../context/modalContext";

const ModalAdd = () => {
  const { handleClose } = useContext(ModalContext);
  return (
    <>
      <Typography
        sx={{ mb: 3, color: "#013f4e" }}
        id="modal-modal-title"
        variant="h6"
        component="h2"
      >
        Создать пост
      </Typography>
      <TextField
        sx={{ mb: 2 }}
        size="small"
        placeholder="Название поста"
        slotProps={{
          textarea: {
            id: "title",
          },
        }}
      />
      <TextField
        sx={{ mb: 2 }}
        placeholder="Текст поста"
        multiline
        rows={2}
        maxRows={4}
        slotProps={{
          textarea: {
            id: "text",
          },
        }}
      />
      <TextField
        sx={{ mb: 2 }}
        placeholder="Адрес картинки"
        variant="outlined"
        size="small"
        slotProps={{
          textarea: {
            id: "imageAddress",
          },
        }}
      />
      <TextField
        sx={{ mb: 3 }}
        placeholder="Напишите тэги через пробел"
        size="small"
        slotProps={{
          textarea: {
            id: "tags",
          },
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          onClick={handleClose}
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
    </>
  );
};
export default ModalAdd;
