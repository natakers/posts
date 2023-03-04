import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { PostContext } from "../../context/postContext";
import { ModalContext } from "../../context/modalContext";

const ModalConfirm = () => {
  const navigate = useNavigate();
  const { handlePostDelete: onPostDelete, currentPost } =
    useContext(PostContext);
  const { handleClose } = useContext(ModalContext);

  let location = useLocation();

  function handleDel(e) {
    e.stopPropagation();
    onPostDelete();
    handleClose();
    if (currentPost === location.pathname.split("/").reverse()[0]) {
      navigate(-1);
    }
  }
  return (
    <>
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
    </>
  );
};
export default ModalConfirm;
