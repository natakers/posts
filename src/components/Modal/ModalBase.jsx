import { useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ModalPost from "./ModalPost";
import ModalConfirm from "./ModalConfirm";
import { ModalContext } from "../../context/modalContext";
import ModalUpdateUser from "./ModalUpdeteUser";

const ModalBase = () => {
  const { open, handleClose, type, secondType } = useContext(ModalContext);
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {type === "confirm" && <ModalConfirm />}
          {type === "post_modal" && <ModalPost type={secondType} />}
          {type === "update_user" && <ModalUpdateUser />}
        </Box>
      </Modal>
    </>
  );
};
export default ModalBase;
