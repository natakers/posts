import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/AutoAwesome";
import UserInfo from "./UserInfo";
import { UsersState } from "redux/reducers/user/userSlice";
import { useTypedSelector } from "hooks/useTypedSelector";

const Header = () => {
  const { token }: UsersState = useTypedSelector(state => state.user)

  return (
    <AppBar position="static" sx={{ backgroundColor: "#013f4e" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: "flex", mr: 1 }} />
          <Box sx={{ flexGrow: 1, display: "flex" }}></Box>
          {token && <UserInfo/> }
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
