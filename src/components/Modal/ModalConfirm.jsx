import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import { useLocation, useNavigate } from 'react-router-dom';

const ModalConfirm = ({ post, onPostDelete }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let location = useLocation()
  const navigate = useNavigate()
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

  function handleDel(e) {
    e.stopPropagation();
    onPostDelete(post);
    handleClose();
    if (post._id === location.pathname.split('/').reverse()[0]) {
      navigate(-1)
    }
  }
  return (
    <>
      <IconButton aria-label="add to favorites" onClick={handleOpen}>
        <Delete />
      </IconButton>
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
            Уверены что хотите удалить пост?
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              onClick={(e) => handleDel(e)}
              variant="contained"
              sx={{
                backgroundColor: "#00718f",
                ":hover": { bgcolor: "#58641a", color: "white" },
              }}
            >
              Да
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
              Нет
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
export default ModalConfirm;
