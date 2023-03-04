import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import "moment/locale/ru";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

const NewComment = () => {
  const { user: currentUser } = useContext(UserContext);
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
      <Tooltip title="Open settings">
        <Avatar alt="avatar" src={currentUser.avatar} />
      </Tooltip>
      <TextField
        sx={{ mb: 2 }}
        placeholder="Текст поста"
        multiline
        // rows={2}
        maxRows={4}
        // slotProps={{
        //   textarea: {
        //     id: "text",
        //   },
        // }}
      />
      <Button
        // onClick={handleClickButtonEdit}
        variant="contained"
        sx={{
          backgroundColor: "#00718f",
          ":hover": { bgcolor: "#58641a", color: "white" },
        }}
      >
        ✓
      </Button>
      <Button
        // onClick={handleClickButtonEdit}
        variant="contained"
        sx={{
          backgroundColor: "#f0e2d5",
          color: "#013f4e",
          ":hover": { bgcolor: "#58641a", color: "white" },
        }}
      >
        x
      </Button>
    </Box>
  );
};

export default NewComment;
