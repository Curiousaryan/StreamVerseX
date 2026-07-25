import { createTheme } from "@mui/material/styles";

import palette from "./palette";
import typography from "./typography";
import breakpoints from "./breakpoints";
import components from "./componentOverrides";

const theme = createTheme({
  palette,
  typography,
  breakpoints,
  components,
});

export default theme;