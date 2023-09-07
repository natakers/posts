import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ModalPost from "./ModalPost";
import ModalConfirm from "./ModalConfirm";
import ModalUpdateUser from "./ModalUpdeteUser";
import ModalSignUp from "./ModalSignUp";
import ModalSignIn from "./ModalSignIn";
import { ModalState, handleClose } from "redux/reducers/modal/modalSlice";
import { useTypedSelector } from "hooks/useTypedSelector";
import { useAppDispatch } from "hooks/useAppDispatch";

const ModalBase = () => {
  const { open, type }: ModalState = useTypedSelector(state => state.modal)
  const dispatch = useAppDispatch()
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
        onClose={() => dispatch(handleClose())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {type === "confirm" && <ModalConfirm />}
          {type === "post_modal" && <ModalPost />}
          {type === "update_user" && <ModalUpdateUser />}
          {type === "signUp" && <ModalSignUp />}
          {type === "signIn" && <ModalSignIn />}
        </Box>
      </Modal>
    </>
  );
};
export default ModalBase;
