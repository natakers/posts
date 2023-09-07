import React, { memo, useState } from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { tabs } from "../../utils";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme1 = createTheme({
  palette: {
    primary: {
      main: "#013f4e",
    },
  },
});
const Sort = memo(({setCurrentSort}: {setCurrentSort: (id: string) => void}) => {
  console.log("sort");
  const [alignment, setAlignment] = useState("По дате");

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    console.log(newAlignment);
    setCurrentSort(newAlignment);
    setAlignment(newAlignment);
  };
  return (
    <ThemeProvider theme={theme1}>
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
    </ThemeProvider>
  );
});
export default Sort;
