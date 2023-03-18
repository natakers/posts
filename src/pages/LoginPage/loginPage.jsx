import Box from "@mui/material/Box";
import Registration from "../../components/Registration/Registration";

const LoginPage = () => {
  return (
    <Box sx={{ display: "flex", flexGrow: 1, flexDirection: "column" }}>
      <Registration />
    </Box>
  );
};

export default LoginPage;
