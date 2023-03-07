import Box from "@mui/material/Box";
import React, { memo } from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { tabs } from "../../utils";
import { grey } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const color = grey[500];
const theme1 = createTheme({
  status: {
    danger: color,
  },
  palette: {
    primary: {
      main: "#013f4e",
      darker: color,
      active: "#013f4e",
    },
    neutral: {
      main: "#013f4e",
      contrastText: color,
    },
  },
});
const Sort = memo(({ onChangeSort }) => {
  console.log("sort");
  const [alignment, setAlignment] = React.useState("По дате");

  const handleChange = (event, newAlignment) => {
    onChangeSort(newAlignment);
    setAlignment(newAlignment);
    console.log(alignment);
  };
  return (
    <ThemeProvider theme={theme1}>
      <Box sx={{ mb: 2 }}>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="text button group"
        >
          {tabs.map((tab) => (
            <ToggleButton key={tab.id} value={tab.title}>
              {tab.title}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
    </ThemeProvider>
  );
});
export default Sort;
