import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const ModalAdd = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: 220, sm: 300, md: 400 },
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    borderRadius: "1rem",
    border: "none",
  };
  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{
          backgroundColor: "#00718f",
          marginLeft: "20px",
          ":hover": { bgcolor: "#58641a", color: "white" },
        }}
      >
        Создать пост
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
        </Box>
      </Modal>
    </>
  );
};
export default ModalAdd;
